package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Cart;

import jakarta.transaction.Transactional;

@Repository
public interface CartRepository extends JpaRepository<Cart,Long> {
    @Transactional
    @Modifying
    @Query("UPDATE Cart c SET c.quantity = :quantity WHERE  c.userId = :userId AND c.productId = :productId")
    int updateCartQuantityByProductId( String userId, String productId, int quantity);
}
