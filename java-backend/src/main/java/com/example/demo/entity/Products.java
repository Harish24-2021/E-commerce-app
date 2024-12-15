package com.example.demo.entity;
import jakarta.persistence.*;
@Entity
@Table(name = "products")

public class Products  {
   @Id

    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer quantity;

    private String image;


        // Constructors
    public Products() {}

    public Products(String name, Double price, Integer quantity, String image) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
        // Getters and Setters
        public Long getId() {
            return id;
        }
    
        public void setId(Long id) {
            this.id = id;
        }
    
        public String getName() {
            return name;
        }
    
        public void setName(String name) {
            this.name = name;
        }
    
        public Double getPrice() {
            return price;
        }
    
        public void setPrice(Double price) {
            this.price = price;
        }
    
        public Integer getQuantity() {
            return quantity;
        }
    
        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }
    
        public String getImage() {
            return image;
        }
    
        public void setImage(String image) {
            this.image = image;
        }
    
}