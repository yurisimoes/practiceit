using Api.Entities.Cards;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Context.Configurations;

public class DeckConfiguration : IEntityTypeConfiguration<Deck>
{
    public void Configure(EntityTypeBuilder<Deck> builder)
    {
        builder.Property(x => x.Id).UseIdentityAlwaysColumn();
        builder.HasMany(x => x.Cards).WithOne().HasForeignKey(x => x.DeckId);
        builder.HasOne(x => x.User).WithMany().HasForeignKey(x => x.UserId);
    }
}
