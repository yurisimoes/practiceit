using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class V2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "deck_id",
                table: "cards",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "decks_of_cards",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    title = table.Column<string>(type: "text", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_decks_of_cards", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_cards_deck_id",
                table: "cards",
                column: "deck_id");

            migrationBuilder.AddForeignKey(
                name: "fk_cards_decks_of_cards_deck_id",
                table: "cards",
                column: "deck_id",
                principalTable: "decks_of_cards",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_cards_decks_of_cards_deck_id",
                table: "cards");

            migrationBuilder.DropTable(
                name: "decks_of_cards");

            migrationBuilder.DropIndex(
                name: "ix_cards_deck_id",
                table: "cards");

            migrationBuilder.DropColumn(
                name: "deck_id",
                table: "cards");
        }
    }
}
