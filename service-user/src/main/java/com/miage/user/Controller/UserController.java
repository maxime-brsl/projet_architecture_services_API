package com.miage.user.Controller;

import com.miage.user.Entity.User;
import com.miage.user.Messaging.UserEventPublisher;
import com.miage.user.Service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserEventPublisher userEventPublisher;

    public UserController(UserService userService, UserEventPublisher userEventPublisher) {
        this.userService = userService;
        this.userEventPublisher = userEventPublisher;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        userEventPublisher.publishUserCreatedEvent(registeredUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> credentials) {
        String token = userService.loginUser(credentials.get("username"), credentials.get("password"));
        return ResponseEntity.ok(token);
    }
}
