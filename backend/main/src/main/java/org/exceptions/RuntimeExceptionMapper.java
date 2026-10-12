package org.exceptions;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;

import java.util.logging.Level;
import java.util.logging.Logger;

@Provider
public class RuntimeExceptionMapper implements ExceptionMapper<RuntimeException> {
    private static final Logger logger = Logger.getLogger(RuntimeExceptionMapper.class.getName());

    @Override
    public Response toResponse(RuntimeException exception) {
        logger.log(Level.SEVERE, "Unhandled runtime exception", exception);

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .type(MediaType.APPLICATION_JSON)
                .entity("{\"message\":\"Internal server error\"}")
                .build();
    }
}
