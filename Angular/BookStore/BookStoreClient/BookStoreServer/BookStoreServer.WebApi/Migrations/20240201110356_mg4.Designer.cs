﻿// <auto-generated />
using System;
using BookStoreServer.WebApi.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace BookStoreServer.WebApi.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20240201110356_mg4")]
    partial class mg4
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("BookStoreServer.WebApi.Models.Book", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CoverImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreateAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("ISBN")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Summary")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Books");
                });

            modelBuilder.Entity("BookStoreServer.WebApi.Models.BookCategory", b =>
                {
                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.HasKey("BookId", "CategoryId");

                    b.HasIndex("CategoryId");

                    b.ToTable("BookCategories");
                });

            modelBuilder.Entity("BookStoreServer.WebApi.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Korku"
                        },
                        new
                        {
                            Id = 2,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Bilim Kurgu"
                        },
                        new
                        {
                            Id = 3,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Tarih"
                        },
                        new
                        {
                            Id = 4,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Edebiyat"
                        },
                        new
                        {
                            Id = 5,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Çocuk"
                        },
                        new
                        {
                            Id = 6,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Psikoloji"
                        },
                        new
                        {
                            Id = 7,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Din"
                        },
                        new
                        {
                            Id = 8,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Felsefe"
                        },
                        new
                        {
                            Id = 9,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Bilim"
                        },
                        new
                        {
                            Id = 10,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Sanat"
                        },
                        new
                        {
                            Id = 11,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Spor"
                        },
                        new
                        {
                            Id = 12,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Gezi"
                        },
                        new
                        {
                            Id = 13,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Dergi"
                        },
                        new
                        {
                            Id = 14,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Mizah"
                        },
                        new
                        {
                            Id = 15,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Kişisel Gelişim"
                        },
                        new
                        {
                            Id = 16,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Yemek"
                        },
                        new
                        {
                            Id = 17,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Hobi"
                        },
                        new
                        {
                            Id = 18,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Referans"
                        },
                        new
                        {
                            Id = 19,
                            IsActive = true,
                            IsDeleted = false,
                            Name = "Eğitim"
                        });
                });

            modelBuilder.Entity("BookStoreServer.WebApi.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BookId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("PaymentNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PaymentType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BookId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("BookStoreServer.WebApi.Models.OrderStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTime>("StatusDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("OrderStatuses");
                });

            modelBuilder.Entity("BookStoreServer.WebApi.Models.Book", b =>
                {
                    b.OwnsOne("BookStoreServer.WebApi.ValueObjects.Money", "Price", b1 =>
                        {
                            b1.Property<int>("BookId")
                                .HasColumnType("int");

                            b1.Property<string>("Currency")
                                .HasMaxLength(5)
                                .HasColumnType("nvarchar(5)");

                            b1.Property<decimal>("Value")
                                .HasColumnType("money");

                            b1.HasKey("BookId");

                            b1.ToTable("Books");

                            b1.WithOwner()
                                .HasForeignKey("BookId");
                        });

                    b.Navigation("Price");
                });

            modelBuilder.Entity("BookStoreServer.WebApi.Models.BookCategory", b =>
                {
                    b.HasOne("BookStoreServer.WebApi.Models.Book", "Book")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BookStoreServer.WebApi.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Book");

                    b.Navigation("Category");
                });

            modelBuilder.Entity("BookStoreServer.WebApi.Models.Order", b =>
                {
                    b.HasOne("BookStoreServer.WebApi.Models.Book", "Books")
                        .WithMany()
                        .HasForeignKey("BookId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("BookStoreServer.WebApi.ValueObjects.Money", "Price", b1 =>
                        {
                            b1.Property<int>("OrderId")
                                .HasColumnType("int");

                            b1.Property<string>("Currency")
                                .HasMaxLength(5)
                                .HasColumnType("nvarchar(5)");

                            b1.Property<decimal>("Value")
                                .HasColumnType("money");

                            b1.HasKey("OrderId");

                            b1.ToTable("Orders");

                            b1.WithOwner()
                                .HasForeignKey("OrderId");
                        });

                    b.Navigation("Books");

                    b.Navigation("Price");
                });
#pragma warning restore 612, 618
        }
    }
}
