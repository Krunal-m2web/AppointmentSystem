using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Appointmentbookingsystem.Backend.Models.Entities
{
    public class ServicePrice: IHasTimestamps
    {
        public int Id {get; set;}

        //FK -> Service
        public int ServiceId { get; set;}
        public Service? Service { get; set;} = null!;

        // ISO currency code, e.g. USD, EUR
        [Required]
        [MaxLength(3)]
        public string Currency { get; set; } = null!;

        // Price in the currency
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        // one per service can be default
        // (e.g. USD set to be default currency)
        // public bool IsDefault { get; set; } = false;

        // public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; }  
        public DateTime UpdatedAt { get; set; }  

        
    }
}
