using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Spectrum.Web.Models
{
    public class RegisterOrganizationViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? OrganizationTypeId { get; set; }
        public int OrganizationId { get; set; }
        public int? AddressNorthAmericaId { get; set; }
        public bool Default { get; set; }
        public string ProfileName { get; set; }
        public string Description { get; set; }
        public string PrimaryContact { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string Country { get; set; }
        public string County { get; set; }
        public string TimeZone { get; set; }
        public bool? DstAdjust { get; set; }
        public string Language { get; set; }
        public string Notes { get; set; }
    }
}