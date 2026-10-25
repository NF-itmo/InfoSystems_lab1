package org.controllers;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.controllers.DTO.bookCreature.CreateBookCreatureRequest;
import org.controllers.DTO.bookCreature.CreateBookCreatureResponse;
import org.controllers.DTO.bookCreature.GetAverageDefenseLevelResponse;
import org.controllers.DTO.bookCreature.GetBookCreatureResponse;
import org.controllers.DTO.bookCreature.GetRingCountResponse;
import org.controllers.DTO.bookCreature.UpdateBookCreatureRequest;
import org.services.BookCreatureService;

import java.util.List;

@Path("/book-creatures")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class BookCreatureController {
    @Inject private BookCreatureService bookCreatureService;

    @POST
    public CreateBookCreatureResponse create(@Valid CreateBookCreatureRequest request) {
        return new CreateBookCreatureResponse(
                bookCreatureService.create(
                        request.toServiceDto()
                ).getId()
        );
    }

    @GET
    public List<GetBookCreatureResponse> findAll(
            @QueryParam("page") @DefaultValue("0") @Min(0) int page,
            @QueryParam("size") @DefaultValue("20") @Min(1) @Max(100) int size,
            @QueryParam("name") String name
    ) {
        return bookCreatureService.findAll(page, size, name)
                .getItems().stream()
                .map(GetBookCreatureResponse::fromServiceDto)
                .toList();
    }

    @GET
    @Path("/avg-def-level")
    public GetAverageDefenseLevelResponse findAverageDefenseLevel() {
        return new GetAverageDefenseLevelResponse(
                bookCreatureService.findAverageDefenseLevel()
        );
    }

    @GET
    @Path("/max-cords")
    public GetBookCreatureResponse findByMaximumCoordinates() {
        return GetBookCreatureResponse.fromServiceDto(
                bookCreatureService.findByMaximumCoordinates()
                        .orElseThrow(() -> new NotFoundException("No book creatures exist"))
        );
    }

    @GET
    @Path("/ring-count")
    public GetRingCountResponse countByRingPowerGreaterThan(
            @QueryParam("power") @NotNull @Positive Integer power
    ) {
        return new GetRingCountResponse(
                bookCreatureService.countByRingPowerGreaterThan(power)
        );
    }

    @GET
    @Path("/{id}")
    public GetBookCreatureResponse findById(
            @PathParam("id") @Min(1) int id
    ) {
        return GetBookCreatureResponse.fromServiceDto(
                bookCreatureService.findById(id)
                        .orElseThrow(() -> new NotFoundException("BookCreature " + id + " was not found"))
        );
    }

    @PUT
    @Path("/{id}")
    public Response update(
            @PathParam("id") @Min(1) int id,
            @Valid UpdateBookCreatureRequest request
    ) {
        bookCreatureService.update(id, request.toServiceDto())
                .orElseThrow(() -> new NotFoundException("BookCreature " + id + " was not found"));
        return Response.noContent().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(
            @PathParam("id") @Min(1) int id
    ) {
        if (!bookCreatureService.delete(id)) {
            throw new NotFoundException("BookCreature " + id + " was not found");
        }
        return Response.noContent().build();
    }
}
