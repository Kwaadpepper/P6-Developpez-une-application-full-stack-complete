package com.openclassrooms.mddapi.provider.schema_filter;

import java.util.Set;

import org.hibernate.boot.model.relational.Namespace;
import org.hibernate.boot.model.relational.Sequence;
import org.hibernate.mapping.Table;
import org.hibernate.tool.schema.spi.SchemaFilter;

class MddSchemaFilter implements SchemaFilter {
    public static final MddSchemaFilter INSTANCE = new MddSchemaFilter();

    private Set<String> excludedTables = Set.of(
            "comment_with_author",
            "topic_with_subscription");

    @Override
    public boolean includeNamespace(@SuppressWarnings("null") Namespace namespace) {
        return true;
    }

    @Override
    public boolean includeTable(@SuppressWarnings("null") Table table) {
        if (excludedTables.contains(table.getName().toLowerCase())) {
            return false;
        }
        return true;
    }

    @Override
    public boolean includeSequence(@SuppressWarnings("null") Sequence sequence) {
        return true;
    }
}
