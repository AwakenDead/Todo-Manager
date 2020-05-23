/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.demoOne.rest;

/**
 *
 * @author Akhilesh
 */
import com.example.demoOne.jwt.jwtRequest;
import com.example.demoOne.jwt.jwtResponse;
import com.example.demoOne.jwt.jwtTokenUtil;
import com.example.demoOne.service.userDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class jwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private jwtTokenUtil jwtTokenUtil;

	@Autowired
	private userDetailsService userDetailsService;

	@PostMapping("/signIn")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody jwtRequest authenticationRequest) throws Exception {
                authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
                
		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new jwtResponse(token));
	}

	private void authenticate(String username, String password) throws Exception {
		try {
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (BadCredentialsException e) {
                    throw new userNotFoundException("INVALID_CREDENTIALS");
		}
	}
}

@ResponseStatus(HttpStatus.NOT_FOUND)
class userNotFoundException extends RuntimeException{
    public userNotFoundException(String message){
        super(message);
    }
}
