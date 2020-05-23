package com.example.demoOne.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class users {
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="id")
    int id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;
    
    @Column(name="enabled")
    private boolean enabled;
    
    @Column(name="name")
    private String name;
    
    @Column(name="email_id")
    private String email_id;

    @Column(name="image_url")
    private String image_url;
    
    public users() {
    }

    public users(String username, String password) {
            this.username = username;
            this.password = password;
    }

    public int getId() {
            return id;
    }

    public void setId(int id) {
            this.id = id;
    }

    public String getUsername() {
            return username;
    }

    public void setUsername(String username) {
            this.username = username;
    }

    public String getPassword() {
            return password;
    }

    public void setPassword(String password) {
            this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail_id() {
        return email_id;
    }

    public void setEmail_id(String email) {
        this.email_id = email;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    @Override
    public String toString() {
            return "user [id=" + id + ", username=" + username + ", password=" + password + "]";
    }
    
//
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<userRoles> roles;
    
    public List<userRoles> getRoles() {
        return roles;
    }

    public void setRoles(List<userRoles> roles) {
        this.roles = roles;
    }
    
    public void addRole(userRoles role){
        
        if(roles == null){
            roles = new ArrayList<>();
        }
        roles.add(role);
    }
    
    @OneToMany(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<todoList> todos;

    public List<todoList> getTodos() {
        return todos;
    }
    
    public void addTodos(todoList todo){
        if(todos == null){
            todos = new ArrayList<>();
        }
        todos.add(todo);
    }
    
    public void setTodos(List<todoList> todos){
        this.todos = todos;
    }
	
}
