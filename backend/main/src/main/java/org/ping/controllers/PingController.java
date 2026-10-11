package org.ping.controllers;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

@Path("/ping")
public class PingController {
    @GET
    public String ping() {
        return "pong";
    }
}
