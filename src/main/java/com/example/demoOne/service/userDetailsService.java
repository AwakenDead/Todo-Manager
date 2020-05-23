/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demoOne.service;
/**
 *
 * @author Akhilesh
 */

import com.example.demoOne.dao.userDao;
import com.example.demoOne.entity.userRoles;
import com.example.demoOne.entity.users;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class userDetailsService implements UserDetailsService {

    @Autowired
    private userDao userDaoIn;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        users userIn = userDaoIn.findByUsername(username);
        if (userIn == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        ArrayList<GrantedAuthority> authorities= new ArrayList<>();
        for(userRoles role: userIn.getRoles()){
            authorities.add( new SimpleGrantedAuthority(role.getRole()));
        }
        return new org.springframework.security.core.userdetails.User(userIn.getUsername(), userIn.getPassword(), authorities);
    }

}