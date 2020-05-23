/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demoOne.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author Akhilesh
 */
@Entity
@Table(name="user_roles")
public class userRoles {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="id")
    int id;
    
    @Column(name="role")
    private String role;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "user_roles{" + ", role=" + role + '}';
    }
}
