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
import org.controllers.DTO.CreateMagicCityRequest;
import org.controllers.DTO.CreateMagicCityResponse;
import org.controllers.DTO.GetMagicCityResponse;
import org.controllers.DTO.UpdateMagicCityRequest;
import org.services.MagicCityService;

import java.util.List;

@Path("/magic-cities")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MagicCityController {
    @Inject private MagicCityService magicCityService;

    @POST
    public CreateMagicCityResponse create(@Valid CreateMagicCityRequest request) {
        return new CreateMagicCityResponse(
                magicCityService.create(request.toServiceDto()).getName()
        );
    }

    @GET
    public List<GetMagicCityResponse> findAll() {
        return magicCityService.findAll().stream()
                .map(GetMagicCityResponse::fromServiceDto)
                .toList();
    }

    @GET
    @Path("/{name}")
    public GetMagicCityResponse findByName(
            @PathParam("name") @NotBlank String name
    ) {
        return GetMagicCityResponse.fromServiceDto(
                magicCityService.findByName(name)
                        .orElseThrow(() -> new NotFoundException("MagicCity " + name + " was not found"))
        );
    }

    @PUT
    @Path("/{name}")
    public Response update(
            @PathParam("name") @NotBlank String name,
            @Valid UpdateMagicCityRequest request
    ) {
        magicCityService.update(name, request.toServiceDto())
                .orElseThrow(() -> new NotFoundException("MagicCity " + name + " was not found"));
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{name}")
    public Response delete(
            @PathParam("name") @NotBlank String name
    ) {
        if (!magicCityService.delete(name)) {
            throw new NotFoundException("MagicCity " + name + " was not found");
        }

        return Response.noContent().build();
    }
}
