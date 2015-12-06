using System.ComponentModel.DataAnnotations.Schema;
using Spectrum.Core.Data.Models.Interfaces;

namespace Spectrum.Core.Data.Models
{
    public partial class OrganizationType : IObjectState
    {
        [NotMapped]
        public ObjectState ObjectState { get; set; }
    }
}