using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Organizations
{
    public class OrganizationAddRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int OrganizationTypeId { get; set; }
        [Required]
        [MinLength(2), MaxLength(200)]
        public string Name { get; set; }
        [Required]
        [MinLength(2), MaxLength(200)]
        public string Headline { get; set; }
        [Required]
        [MinLength(2), MaxLength]
        public string Description { get; set; }
        [Required]
        [MinLength(2), MaxLength(255)]
        public string Logo { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int LocationId { get; set; }
        [Required]
        [MinLength(2), MaxLength(50)]
        public string Phone { get; set; }
        [Required]
        [MinLength(2), MaxLength(255)]
        public string SiteUrl { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int StatusId { get; set; }
    }
}
