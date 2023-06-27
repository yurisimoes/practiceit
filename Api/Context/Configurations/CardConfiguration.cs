using Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Context.Configurations;

public class CardConfiguration : IEntityTypeConfiguration<Card>
{

    public void Configure(EntityTypeBuilder<Card> builder)
    {
        builder.Property(x => x.Id).UseIdentityAlwaysColumn();
    }
}
