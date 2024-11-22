package com.miage.RealDeal.Messaging;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miage.RealDeal.Entity.User;

@Service
public class UserEventPublisher {

    @Autowired
    private AmqpTemplate amqpTemplate;

    private final String exchange = "user.exchange";

    private final String routingKey = "user.created";

    public void publishUserCreatedEvent(User user) {
        amqpTemplate.convertAndSend(exchange, routingKey, user);
    }

    public void publishUserUpdatedEvent(User user) {
        String routingKey = "user.updated";
        amqpTemplate.convertAndSend(exchange, routingKey, user);
    }

    public void publishUserDeletedEvent(User user) {
        String routingKey = "user.deleted";
        amqpTemplate.convertAndSend(exchange, routingKey, user);
    }
}

