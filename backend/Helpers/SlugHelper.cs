using System.Text.RegularExpressions;

namespace Appointmentbookingsystem.Backend.Helpers
{
    public static class SlugHelper
    {
        public static string GenerateSlug(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return string.Empty;
                
            // Convert to lowercase and trim
            var slug = name.ToLower().Trim();
            
            // Remove special characters, keep only alphanumeric and spaces
            slug = Regex.Replace(slug, @"[^a-z0-9\s-]", "");
            
            // Replace multiple spaces with single space
            slug = Regex.Replace(slug, @"\s+", " ");
            
            // Replace spaces with hyphens
            slug = slug.Replace(" ", "-");
            
            // Replace multiple hyphens with single hyphen
            slug = Regex.Replace(slug, @"-+", "-");
            
            // Trim hyphens from ends
            slug = slug.Trim('-');
            
            return slug;
        }
    }
}
