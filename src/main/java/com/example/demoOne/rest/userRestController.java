package com.example.demoOne.rest;

import com.example.demoOne.dao.todoListDao;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demoOne.dao.userDao;
import com.example.demoOne.entity.todoList;
import com.example.demoOne.entity.userRoles;
import com.example.demoOne.entity.users;
import com.example.demoOne.jwt.jwtResponse;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
//@CrossOrigin
public class userRestController {
	
    @Autowired
    private userDao userDaoIn;

    @Autowired
    private todoListDao todoListDaoIn;
    
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @GetMapping("/admin/all")
    public List<users> findAll() {
        return userDaoIn.findAll();
    }

    @GetMapping("/user/{username}")
    public users user(@PathVariable String username){
        return userDaoIn.findByUsername(username);
    }
    
    @GetMapping("/available/{username}")
    public ResponseEntity<?> available(@PathVariable String username){
        return ResponseEntity.ok(userDaoIn.findByUsername(username) == null);
    }
    
    @PostMapping("/signUp")
    public void register(@RequestBody users userIn) {
        System.out.println(userIn);
        userIn.setPassword(bCryptPasswordEncoder.encode(userIn.getPassword()));
        userRoles role = new userRoles();
        role.setRole("USER");
        userIn.addRole(role);
        userDaoIn.save(userIn);
    }
    
    @PutMapping("/admin/update/role/{id}")
    public void update_details(@PathVariable int id, @RequestBody List<userRoles> userRole) {
        users user = userDaoIn.findById(id);
        user.setRoles(userRole);
        userDaoIn.save(user);
    }
    
    @PostMapping("/addTodo/{username}")
    public void addTodo(@PathVariable String username, @RequestBody todoList todo) {
        users user = userDaoIn.findByUsername(username);
        user.addTodos(todo);
        userDaoIn.save(user);
    }
    
    @DeleteMapping("/deleteTodo/{id}")
    public void deleteTodo(@PathVariable int id) {
        todoListDaoIn.delete(todoListDaoIn.findById(id));
    }
    
    @PutMapping("/markTodo/{id}")
    public void markTodo(@PathVariable int id) {
        todoList t = todoListDaoIn.findById(id);
        t.setDone(true);
        todoListDaoIn.save(t);
    }
    
    @PutMapping("/editTodo")
    public void editTodo(@RequestBody todoList todo) {
//        todoList databaseTodo = todoListDaoIn.findById(id);
        todoListDaoIn.save(todo);
    }
    
    @GetMapping("/getTodo/{id}")
    public todoList getTodo(@PathVariable int id) {
        return todoListDaoIn.findById(id);
    }
}
