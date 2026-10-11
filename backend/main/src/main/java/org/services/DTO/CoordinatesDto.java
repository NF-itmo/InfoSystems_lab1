package org.services.DTO;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CoordinatesDto {
    private double x;
    private int y;
}
