using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using Spectrum.Data.Core.Models;

namespace Spectrum.Web.Models
{
    public class UserViewModel
    {
        public UserViewModel()
        {
            UserOrganizations = new List<UserOrganizationViewModel>();
            UserProfiles = new List<UserProfileViewModel>();
            UserRoles = new List<UserRoleViewModel>();
            UserPositions = new List<UserPositionViewModel>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        //Application state specific properties
        public int SelectedOrganizationId { get; set; }
        public string SelectedOrganizationName { get; set; }
        public int SelectedRoleId { get; set; }
        public string SelectedRoleName { get; set; }
        public int SelectedPositionId { get; set; }
        public string SelectedPositionName { get; set; }

        public ICollection<UserOrganizationViewModel> UserOrganizations { get; set; }
        public ICollection<UserRoleViewModel> UserRoles { get; set; }
        public ICollection<UserProfileViewModel> UserProfiles { get; set; }
        public ICollection<UserPositionViewModel> UserPositions { get; set; }
    }
}