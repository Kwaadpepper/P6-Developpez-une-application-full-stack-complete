package com.openclassrooms.mddapi.provider.schema_filter;

import org.hibernate.tool.schema.spi.SchemaFilter;
import org.hibernate.tool.schema.spi.SchemaFilterProvider;

public class MddSchemaFilterProvider implements SchemaFilterProvider {

    @Override // w w w . d e m o2 s . c o m
    public SchemaFilter getCreateFilter() {
        return MddSchemaFilter.INSTANCE;
    }

    @Override
    public SchemaFilter getDropFilter() {
        return MddSchemaFilter.INSTANCE;
    }

    @Override
    public SchemaFilter getMigrateFilter() {
        return MddSchemaFilter.INSTANCE;
    }

    @Override
    public SchemaFilter getValidateFilter() {
        return MddSchemaFilter.INSTANCE;
    }

    @Override
    public SchemaFilter getTruncatorFilter() {
        throw new UnsupportedOperationException("Unimplemented method 'getTruncatorFilter'");
    }
}