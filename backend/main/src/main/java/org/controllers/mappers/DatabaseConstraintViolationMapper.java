package org.controllers.mappers;

import jakarta.data.exceptions.DataException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.controllers.DTO.ErrorResponse;

import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Provider
public class DatabaseConstraintViolationMapper
        implements ExceptionMapper<DataException> {

    private static final Logger logger = Logger.getLogger(DatabaseConstraintViolationMapper.class.getName());
    private static final String FOREIGN_KEY_VIOLATION = "23503";

    @Override
    public Response toResponse(DataException exception) {
        if (hasForeignKeyViolation(exception)) {
            return Response.status(Response.Status.CONFLICT)
                    .type(MediaType.APPLICATION_JSON)
                    .entity(new ErrorResponse(
                            "Cannot delete the object because it is referenced by another object"
                    ))
                    .build();
        }

        logger.log(Level.SEVERE, "Unhandled data exception", exception);

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .type(MediaType.APPLICATION_JSON)
                .entity(new ErrorResponse("Internal server error"))
                .build();
    }

    private boolean hasForeignKeyViolation(Throwable exception) {
        Throwable cause = exception;

        while (cause != null) {
            if (cause instanceof SQLException sqlException
                    && FOREIGN_KEY_VIOLATION.equals(sqlException.getSQLState())) {
                return true;
            }

            cause = cause.getCause();
        }

        return false;
    }
}
