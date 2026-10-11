package org.services.DTO;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RingDto {
    private String name;
    private int power;
    private Long weight;
}
