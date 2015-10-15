using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Spectrum.Core.Data.Models;

namespace Spectrum.Core.Data.Configuration
{
    // UserClaim
    internal partial class UserClaimConfiguration : EntityTypeConfiguration<UserClaim>
    {
        public UserClaimConfiguration(string schema = "dbo")
        {
            ToTable(schema + ".UserClaim");
            HasKey(x => x.ClaimId);

            Property(x => x.UserId).HasColumnName("UserId").IsRequired();
            Property(x => x.ClaimId).HasColumnName("ClaimId").IsRequired().HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            Property(x => x.ClaimType).HasColumnName("ClaimType").IsOptional();
            Property(x => x.ClaimValue).HasColumnName("ClaimValue").IsOptional();

            // Foreign keys
            HasRequired(a => a.User).WithMany(b => b.UserClaims).HasForeignKey(c => c.UserId); // FK_UserClaim_User
            InitializePartial();
        }
        partial void InitializePartial();
    }

}
