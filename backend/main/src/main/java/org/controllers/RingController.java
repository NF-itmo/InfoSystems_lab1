package org.controllers;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
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
import org.controllers.DTO.ring.CreateRingRequest;
import org.controllers.DTO.ring.CreateRingResponse;
import org.controllers.DTO.ring.GetRingResponse;
import org.controllers.DTO.ring.UpdateRingRequest;
import org.services.RingService;

import java.util.List;

@Path("/rings")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class RingController {
    @Inject private RingService ringService;

    @POST
    public CreateRingResponse create(@Valid CreateRingRequest request) {
        return new CreateRingResponse(
                ringService.create(request.toServiceDto()).getName()
        );
    }

    @GET
    public List<GetRingResponse> findAll() {
        return ringService.findAll().stream()
                .map(GetRingResponse::fromServiceDto)
                .toList();
    }

    @GET
    @Path("/{name}")
    public GetRingResponse findByName(
            @PathParam("name") @NotBlank String name
    ) {
        return GetRingResponse.fromServiceDto(
                ringService.findByName(name)
                        .orElseThrow(() -> new NotFoundException("Ring " + name + " was not found"))
        );
    }

    @PUT
    @Path("/{name}")
    public Response update(
            @PathParam("name") @NotBlank String name,
            @Valid UpdateRingRequest request
    ) {
        ringService.update(name, request.toServiceDto())
                .orElseThrow(() -> new NotFoundException("Ring " + name + " was not found"));
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{name}")
    public Response delete(
            @PathParam("name") @NotBlank String name
    ) {
        if (!ringService.delete(name)) {
            throw new NotFoundException("Ring " + name + " was not found");
        }

        return Response.noContent().build();
    }
}
