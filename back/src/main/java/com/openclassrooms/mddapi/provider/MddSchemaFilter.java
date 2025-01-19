package com.openclassrooms.mddapi.provider;

import org.hibernate.boot.model.relational.Namespace;
import org.hibernate.boot.model.relational.Sequence;
import org.hibernate.mapping.Table;
import org.hibernate.tool.schema.spi.SchemaFilter;

class MddSchemaFilter implements SchemaFilter {
    public static final MddSchemaFilter INSTANCE = new MddSchemaFilter();

    @Override
    public boolean includeNamespace(Namespace namespace) {
        return true;
    }

    @Override
    public boolean includeTable(Table table) {
        if (table.getName().toLowerCase().contains("comment_with_author")) {
            return false;
        }
        return true;
    }

    @Override
    public boolean includeSequence(Sequence sequence) {
        return true;
    }
}
