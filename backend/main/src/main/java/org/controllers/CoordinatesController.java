package org.controllers;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.controllers.DTO.CreateCoordinatesRequest;
import org.controllers.DTO.CreateCoordinatesResponse;
import org.controllers.DTO.GetCoordinatesResponse;
import org.controllers.DTO.UpdateCoordinatesRequest;
import org.services.CoordinatesService;

import java.util.List;

@Path("/coordinates")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CoordinatesController {
    @Inject private CoordinatesService coordinatesService;

    @POST
    public CreateCoordinatesResponse create(@Valid CreateCoordinatesRequest request) {
        return CreateCoordinatesResponse.fromServiceDto(
                coordinatesService.create(request.toServiceDto())
        );
    }

    @GET
    public List<GetCoordinatesResponse> findAll() {
        return coordinatesService.findAll().stream()
                .map(GetCoordinatesResponse::fromServiceDto)
                .toList();
    }

    @GET
    @Path("/{id}")
    public GetCoordinatesResponse findById(
            @PathParam("id") @Positive int id
    ) {
        return GetCoordinatesResponse.fromServiceDto(
                coordinatesService.findById(id)
                        .orElseThrow(() -> new NotFoundException("Coordinates " + id + " was not found"))
        );
    }

    @PUT
    @Path("/{id}")
    public Response update(
            @PathParam("id") @Positive int id,
            @Valid UpdateCoordinatesRequest request
    ) {
        coordinatesService.update(id, request.toServiceDto())
                .orElseThrow(() -> new NotFoundException("Coordinates " + id + " was not found"));
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(
            @PathParam("id") @Positive int id
    ) {
        if (!coordinatesService.delete(id)) {
            throw new NotFoundException("Coordinates " + id + " was not found");
        }

        return Response.noContent().build();
    }
}
