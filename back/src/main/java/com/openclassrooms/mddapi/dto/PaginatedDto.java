package com.openclassrooms.mddapi.dto;

import java.util.List;

public record PaginatedDto<T extends Record>(
        Integer page,
        Integer totalPages,
        Long totalItems,
        List<T> list) {
    public static <T extends Record> PaginatedDto<T> of(
            Integer page,
            Integer totalPages,
            Long totalItems,
            List<T> list) {
        return new PaginatedDto<>(page, totalPages, totalItems, list);
    }
}
