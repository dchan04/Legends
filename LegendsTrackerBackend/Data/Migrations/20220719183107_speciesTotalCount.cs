﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LegendsTrackerBackend.Data.Migrations
{
    public partial class speciesTotalCount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalCount",
                table: "Species",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalCount",
                table: "Species");
        }
    }
}
