package com.example.demoOne.dao;

import java.util.List;

import com.example.demoOne.entity.users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userDao extends JpaRepository<users, Integer>{
    @Override
    public List<users> findAll();
    
    public users findById(int id);
    
    public users findByUsername(String username);
    
//    public void setTodoswithId();
}