using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebAPIDB.Migrations
{
    /// <inheritdoc />
    public partial class Add_tblTopics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblTopics",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    url_slug = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    priority = table.Column<int>(type: "integer", nullable: false),
                    image = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    parent_id = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTopics", x => x.id);
                    table.ForeignKey(
                        name: "FK_tblTopics_tblTopics_parent_id",
                        column: x => x.parent_id,
                        principalTable: "tblTopics",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblTopics_parent_id",
                table: "tblTopics",
                column: "parent_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblTopics");
        }
    }
}
