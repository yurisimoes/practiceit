using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class v5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "decks_of_cards",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "ix_decks_of_cards_user_id",
                table: "decks_of_cards",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "fk_decks_of_cards_users_user_id",
                table: "decks_of_cards",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_decks_of_cards_users_user_id",
                table: "decks_of_cards");

            migrationBuilder.DropIndex(
                name: "ix_decks_of_cards_user_id",
                table: "decks_of_cards");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "decks_of_cards");
        }
    }
}
