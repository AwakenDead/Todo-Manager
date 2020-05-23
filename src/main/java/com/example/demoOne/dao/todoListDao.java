/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demoOne.dao;

import com.example.demoOne.entity.todoList;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Akhilesh
 */
public interface todoListDao extends JpaRepository<todoList, Integer>{
    public todoList findById(int id);
}
