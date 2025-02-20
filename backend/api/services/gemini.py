import google.generativeai as genai
from django.conf import settings
from typing import Dict, List
import json

class ContentGenerator:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')
    
    def generate_content_idea(self, title: str, target_audience: str) -> str:
        prompt = f"""As an expert content strategist, create a comprehensive content idea.
        Return ONLY a JSON object with the following structure, no other text:
        {{
            "title": "SEO-friendly title (max 60 chars)",
            "description": "Clear description (max 200 chars)",
            "hook": "Attention-grabbing hook (max 150 chars)",
            "outline": ["point 1", "point 2", "point 3"]
        }}

        Topic: {title}
        Target Audience: {target_audience}
        """
        
        response = self.model.generate_content(prompt)
        try:
            # Validate JSON response
            json.loads(response.text)
            return response.text
        except json.JSONDecodeError:
            # If not valid JSON, create a structured response
            return json.dumps({
                "title": title[:60],
                "description": f"Content strategy for {target_audience}",
                "hook": f"Discover how {title} can transform your business",
                "outline": ["Introduction", "Main Points", "Conclusion"]
            })
    
    def generate_tags(self, content_idea: str) -> List[str]:
        try:
            content = json.loads(content_idea)
        except json.JSONDecodeError:
            return ["#contentstrategy", "#business", "#marketing", "#guide", "#tips", "#howto", "#strategy"]
            
        prompt = f"""Generate exactly 7 relevant hashtags for this content. 
        Return ONLY a comma-separated list, no other text.
        
        Content Title: {content['title']}
        Content Description: {content['description']}
        
        Requirements:
        - Each hashtag should be 1-3 words combined
        - All lowercase
        - No spaces (use camelCase for multiple words)
        - Include # symbol
        - No special characters except #
        - Example format: #contentStrategy, #digitalMarketing, #business
        """
        
        response = self.model.generate_content(prompt)
        # Clean and format tags
        tags = []
        for tag in response.text.split(','):
            tag = tag.strip().lower()
            # Ensure tag starts with #
            if not tag.startswith('#'):
                tag = '#' + tag
            # Remove any spaces
            tag = ''.join(tag.split())
            tags.append(tag)
        
        # Ensure we have exactly 7 tags
        default_tags = ["#contentstrategy", "#business", "#marketing", "#guide", "#tips", "#howto", "#strategy"]
        tags.extend(default_tags[len(tags):])
        return tags[:7]
    
    def generate_script(self, content_idea: str) -> str:
        try:
            content = json.loads(content_idea)
        except json.JSONDecodeError:
            return "[ERROR] Could not generate script due to invalid content structure"
            
        prompt = f"""Create a detailed script with clear formatting and structure.

        CONTENT INFO:
        Title: {content['title']}
        Description: {content['description']}
        Hook: {content['hook']}
        Key Points: {', '.join(content['outline'])}
        
        FORMAT REQUIREMENTS:
        1. Use markdown-style formatting
        2. Structure with clear sections
        3. Use bullet points for lists
        4. Add emphasis with *asterisks*
        5. Use double line breaks between sections
        6. Keep sections marked with [SECTION NAME]

        REQUIRED SECTIONS:
        [INTRODUCTION]
        - Start with the hook
        - Set context and importance

        [MAIN CONTENT]
        - Break into 3-4 main points
        - Each point should have:
          * Bold title with asterisks
          * 2-3 bullet points with details
          * Clear actionable advice

        [CONCLUSION]
        - Summarize key takeaways
        - Reinforce main benefits

        [CALL TO ACTION]
        - Clear, compelling next steps
        - Specific action items
        """
        
        response = self.model.generate_content(prompt)
        
        # Format the response with proper line breaks and structure
        formatted_sections = []
        current_section = []
        
        for line in response.text.split('\n'):
            line = line.strip()
            if line.startswith('[') and line.endswith(']'):
                if current_section:
                    formatted_sections.append('\n\n'.join(current_section))
                    current_section = []
                current_section.append(line)
            elif line:
                current_section.append(line)
                
        if current_section:
            formatted_sections.append('\n\n'.join(current_section))
            
        return '\n\n'.join(formatted_sections)

    def process_content(self, title: str, target_audience: str) -> Dict:
        """Orchestrates the entire content generation process"""
        try:
            # Generate initial content idea
            content_idea = self.generate_content_idea(title, target_audience)
            
            # Generate tags based on the content
            tags = self.generate_tags(content_idea)
            
            # Generate full script
            script = self.generate_script(content_idea)
            
            # Validate final response
            try:
                json.loads(content_idea)
            except json.JSONDecodeError:
                return {
                    "status": "error",
                    "message": "Failed to generate valid content structure"
                }
            
            return {
                "content_idea": content_idea,
                "tags": tags,
                "script": script,
                "status": "success"
            }
            
        except Exception as e:
            return {
                "status": "error",
                "message": str(e)
            }