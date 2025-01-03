create type "public"."enum_recipes_cuisine" as enum ('italian', 'mexican', 'chinese', 'japanese', 'indian', 'Asian', 'other');

create type "public"."enum_recipes_ingredients_unit" as enum ('cups', 'tbsp', 'tsp', 'grams', 'oz', 'lb', 'ml', 'l', 'pieces', 'custom');

create sequence "public"."payload_locked_documents_rels_id_seq";

create sequence "public"."payload_preferences_rels_id_seq";

create sequence "public"."profiles_rels_id_seq";

create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now()
);


create table "public"."documents" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now()
);


create table "public"."media" (
    "id" uuid not null default gen_random_uuid(),
    "alt" character varying,
    "prefix" character varying default 'media'::character varying,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now(),
    "url" character varying,
    "thumbnail_u_r_l" character varying,
    "filename" character varying,
    "mime_type" character varying,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
);


create table "public"."payload_locked_documents" (
    "id" uuid not null default gen_random_uuid(),
    "global_slug" character varying,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now()
);


create table "public"."payload_locked_documents_rels" (
    "id" integer not null default nextval('payload_locked_documents_rels_id_seq'::regclass),
    "order" integer,
    "parent_id" uuid not null,
    "path" character varying not null,
    "users_id" uuid,
    "media_id" uuid,
    "documents_id" uuid,
    "profiles_id" uuid,
    "categories_id" uuid,
    "recipes_id" uuid
);


create table "public"."payload_migrations" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now()
);


create table "public"."payload_preferences" (
    "id" uuid not null default gen_random_uuid(),
    "key" character varying,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now()
);


create table "public"."payload_preferences_rels" (
    "id" integer not null default nextval('payload_preferences_rels_id_seq'::regclass),
    "order" integer,
    "parent_id" uuid not null,
    "path" character varying not null,
    "users_id" uuid
);


create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "email" character varying,
    "first_name" character varying,
    "last_name" character varying,
    "bio" character varying,
    "preferences" jsonb,
    "profile_photo_id" uuid,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now(),
    "username" character varying
);


create table "public"."profiles_rels" (
    "id" integer not null default nextval('profiles_rels_id_seq'::regclass),
    "order" integer,
    "parent_id" uuid not null,
    "path" character varying not null,
    "recipes_id" uuid
);


create table "public"."recipes" (
    "id" uuid not null default gen_random_uuid(),
    "is_public" boolean default false,
    "created_by_id" uuid not null,
    "main_image_id" uuid,
    "title" character varying not null,
    "description" character varying,
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now(),
    "slug" character varying,
    "cook_time" numeric,
    "date_published" timestamp(3) with time zone,
    "servings" numeric,
    "cuisine" enum_recipes_cuisine,
    "custom_cuisine" character varying
);


create table "public"."recipes_custom_categories" (
    "_order" integer not null,
    "_parent_id" uuid not null,
    "id" character varying not null,
    "category" character varying
);


create table "public"."recipes_directions" (
    "_order" integer not null,
    "_parent_id" uuid not null,
    "id" character varying not null,
    "step_number" numeric,
    "instruction" character varying not null,
    "step_image_id" uuid
);


create table "public"."recipes_ingredients" (
    "_order" integer not null,
    "_parent_id" uuid not null,
    "id" character varying not null,
    "ingredient" character varying,
    "amount" numeric,
    "unit" enum_recipes_ingredients_unit,
    "custom_unit" character varying
);


create table "public"."recipes_tags" (
    "_order" integer not null,
    "_parent_id" uuid not null,
    "id" character varying not null,
    "tag" character varying
);


create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "updated_at" timestamp(3) with time zone not null default now(),
    "created_at" timestamp(3) with time zone not null default now(),
    "email" character varying not null,
    "reset_password_token" character varying,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" character varying,
    "hash" character varying,
    "login_attempts" numeric default 0,
    "lock_until" timestamp(3) with time zone
);


alter sequence "public"."payload_locked_documents_rels_id_seq" owned by "public"."payload_locked_documents_rels"."id";

alter sequence "public"."payload_preferences_rels_id_seq" owned by "public"."payload_preferences_rels"."id";

alter sequence "public"."profiles_rels_id_seq" owned by "public"."profiles_rels"."id";

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id);

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);

CREATE INDEX documents_created_at_idx ON public.documents USING btree (created_at);

CREATE UNIQUE INDEX documents_pkey ON public.documents USING btree (id);

CREATE INDEX documents_updated_at_idx ON public.documents USING btree (updated_at);

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);

CREATE UNIQUE INDEX media_pkey ON public.media USING btree (id);

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);

CREATE UNIQUE INDEX payload_locked_documents_pkey ON public.payload_locked_documents USING btree (id);

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);

CREATE INDEX payload_locked_documents_rels_documents_id_idx ON public.payload_locked_documents_rels USING btree (documents_id);

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);

CREATE UNIQUE INDEX payload_locked_documents_rels_pkey ON public.payload_locked_documents_rels USING btree (id);

CREATE INDEX payload_locked_documents_rels_profiles_id_idx ON public.payload_locked_documents_rels USING btree (profiles_id);

CREATE INDEX payload_locked_documents_rels_recipes_id_idx ON public.payload_locked_documents_rels USING btree (recipes_id);

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);

CREATE UNIQUE INDEX payload_migrations_pkey ON public.payload_migrations USING btree (id);

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);

CREATE UNIQUE INDEX payload_preferences_pkey ON public.payload_preferences USING btree (id);

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);

CREATE UNIQUE INDEX payload_preferences_rels_pkey ON public.payload_preferences_rels USING btree (id);

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);

CREATE INDEX profiles_created_at_idx ON public.profiles USING btree (created_at);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE INDEX profiles_profile_photo_idx ON public.profiles USING btree (profile_photo_id);

CREATE INDEX profiles_rels_order_idx ON public.profiles_rels USING btree ("order");

CREATE INDEX profiles_rels_parent_idx ON public.profiles_rels USING btree (parent_id);

CREATE INDEX profiles_rels_path_idx ON public.profiles_rels USING btree (path);

CREATE UNIQUE INDEX profiles_rels_pkey ON public.profiles_rels USING btree (id);

CREATE INDEX profiles_rels_recipes_id_idx ON public.profiles_rels USING btree (recipes_id);

CREATE INDEX profiles_updated_at_idx ON public.profiles USING btree (updated_at);

CREATE INDEX recipes_created_at_idx ON public.recipes USING btree (created_at);

CREATE INDEX recipes_created_by_idx ON public.recipes USING btree (created_by_id);

CREATE INDEX recipes_custom_categories_order_idx ON public.recipes_custom_categories USING btree (_order);

CREATE INDEX recipes_custom_categories_parent_id_idx ON public.recipes_custom_categories USING btree (_parent_id);

CREATE UNIQUE INDEX recipes_custom_categories_pkey ON public.recipes_custom_categories USING btree (id);

CREATE INDEX recipes_directions_order_idx ON public.recipes_directions USING btree (_order);

CREATE INDEX recipes_directions_parent_id_idx ON public.recipes_directions USING btree (_parent_id);

CREATE UNIQUE INDEX recipes_directions_pkey ON public.recipes_directions USING btree (id);

CREATE INDEX recipes_directions_step_image_idx ON public.recipes_directions USING btree (step_image_id);

CREATE INDEX recipes_ingredients_order_idx ON public.recipes_ingredients USING btree (_order);

CREATE INDEX recipes_ingredients_parent_id_idx ON public.recipes_ingredients USING btree (_parent_id);

CREATE UNIQUE INDEX recipes_ingredients_pkey ON public.recipes_ingredients USING btree (id);

CREATE INDEX recipes_main_image_idx ON public.recipes USING btree (main_image_id);

CREATE UNIQUE INDEX recipes_pkey ON public.recipes USING btree (id);

CREATE INDEX recipes_tags_order_idx ON public.recipes_tags USING btree (_order);

CREATE INDEX recipes_tags_parent_id_idx ON public.recipes_tags USING btree (_parent_id);

CREATE UNIQUE INDEX recipes_tags_pkey ON public.recipes_tags USING btree (id);

CREATE INDEX recipes_updated_at_idx ON public.recipes USING btree (updated_at);

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."documents" add constraint "documents_pkey" PRIMARY KEY using index "documents_pkey";

alter table "public"."media" add constraint "media_pkey" PRIMARY KEY using index "media_pkey";

alter table "public"."payload_locked_documents" add constraint "payload_locked_documents_pkey" PRIMARY KEY using index "payload_locked_documents_pkey";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_pkey" PRIMARY KEY using index "payload_locked_documents_rels_pkey";

alter table "public"."payload_migrations" add constraint "payload_migrations_pkey" PRIMARY KEY using index "payload_migrations_pkey";

alter table "public"."payload_preferences" add constraint "payload_preferences_pkey" PRIMARY KEY using index "payload_preferences_pkey";

alter table "public"."payload_preferences_rels" add constraint "payload_preferences_rels_pkey" PRIMARY KEY using index "payload_preferences_rels_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles_rels" add constraint "profiles_rels_pkey" PRIMARY KEY using index "profiles_rels_pkey";

alter table "public"."recipes" add constraint "recipes_pkey" PRIMARY KEY using index "recipes_pkey";

alter table "public"."recipes_custom_categories" add constraint "recipes_custom_categories_pkey" PRIMARY KEY using index "recipes_custom_categories_pkey";

alter table "public"."recipes_directions" add constraint "recipes_directions_pkey" PRIMARY KEY using index "recipes_directions_pkey";

alter table "public"."recipes_ingredients" add constraint "recipes_ingredients_pkey" PRIMARY KEY using index "recipes_ingredients_pkey";

alter table "public"."recipes_tags" add constraint "recipes_tags_pkey" PRIMARY KEY using index "recipes_tags_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_categories_fk" FOREIGN KEY (categories_id) REFERENCES categories(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_categories_fk";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_documents_fk" FOREIGN KEY (documents_id) REFERENCES documents(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_documents_fk";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_media_fk" FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_media_fk";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_parent_fk" FOREIGN KEY (parent_id) REFERENCES payload_locked_documents(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_parent_fk";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_profiles_fk" FOREIGN KEY (profiles_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_profiles_fk";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_recipes_fk" FOREIGN KEY (recipes_id) REFERENCES recipes(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_recipes_fk";

alter table "public"."payload_locked_documents_rels" add constraint "payload_locked_documents_rels_users_fk" FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."payload_locked_documents_rels" validate constraint "payload_locked_documents_rels_users_fk";

alter table "public"."payload_preferences_rels" add constraint "payload_preferences_rels_parent_fk" FOREIGN KEY (parent_id) REFERENCES payload_preferences(id) ON DELETE CASCADE not valid;

alter table "public"."payload_preferences_rels" validate constraint "payload_preferences_rels_parent_fk";

alter table "public"."payload_preferences_rels" add constraint "payload_preferences_rels_users_fk" FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."payload_preferences_rels" validate constraint "payload_preferences_rels_users_fk";

alter table "public"."profiles" add constraint "profiles_profile_photo_id_media_id_fk" FOREIGN KEY (profile_photo_id) REFERENCES media(id) ON DELETE SET NULL not valid;

alter table "public"."profiles" validate constraint "profiles_profile_photo_id_media_id_fk";

alter table "public"."profiles_rels" add constraint "profiles_rels_parent_fk" FOREIGN KEY (parent_id) REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."profiles_rels" validate constraint "profiles_rels_parent_fk";

alter table "public"."profiles_rels" add constraint "profiles_rels_recipes_fk" FOREIGN KEY (recipes_id) REFERENCES recipes(id) ON DELETE CASCADE not valid;

alter table "public"."profiles_rels" validate constraint "profiles_rels_recipes_fk";

alter table "public"."recipes" add constraint "recipes_created_by_id_profiles_id_fk" FOREIGN KEY (created_by_id) REFERENCES profiles(id) ON DELETE SET NULL not valid;

alter table "public"."recipes" validate constraint "recipes_created_by_id_profiles_id_fk";

alter table "public"."recipes" add constraint "recipes_main_image_id_media_id_fk" FOREIGN KEY (main_image_id) REFERENCES media(id) ON DELETE SET NULL not valid;

alter table "public"."recipes" validate constraint "recipes_main_image_id_media_id_fk";

alter table "public"."recipes_custom_categories" add constraint "recipes_custom_categories_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES recipes(id) ON DELETE CASCADE not valid;

alter table "public"."recipes_custom_categories" validate constraint "recipes_custom_categories_parent_id_fk";

alter table "public"."recipes_directions" add constraint "recipes_directions_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES recipes(id) ON DELETE CASCADE not valid;

alter table "public"."recipes_directions" validate constraint "recipes_directions_parent_id_fk";

alter table "public"."recipes_directions" add constraint "recipes_directions_step_image_id_media_id_fk" FOREIGN KEY (step_image_id) REFERENCES media(id) ON DELETE SET NULL not valid;

alter table "public"."recipes_directions" validate constraint "recipes_directions_step_image_id_media_id_fk";

alter table "public"."recipes_ingredients" add constraint "recipes_ingredients_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES recipes(id) ON DELETE CASCADE not valid;

alter table "public"."recipes_ingredients" validate constraint "recipes_ingredients_parent_id_fk";

alter table "public"."recipes_tags" add constraint "recipes_tags_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES recipes(id) ON DELETE CASCADE not valid;

alter table "public"."recipes_tags" validate constraint "recipes_tags_parent_id_fk";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
END;$function$
;

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

grant delete on table "public"."documents" to "anon";

grant insert on table "public"."documents" to "anon";

grant references on table "public"."documents" to "anon";

grant select on table "public"."documents" to "anon";

grant trigger on table "public"."documents" to "anon";

grant truncate on table "public"."documents" to "anon";

grant update on table "public"."documents" to "anon";

grant delete on table "public"."documents" to "authenticated";

grant insert on table "public"."documents" to "authenticated";

grant references on table "public"."documents" to "authenticated";

grant select on table "public"."documents" to "authenticated";

grant trigger on table "public"."documents" to "authenticated";

grant truncate on table "public"."documents" to "authenticated";

grant update on table "public"."documents" to "authenticated";

grant delete on table "public"."documents" to "service_role";

grant insert on table "public"."documents" to "service_role";

grant references on table "public"."documents" to "service_role";

grant select on table "public"."documents" to "service_role";

grant trigger on table "public"."documents" to "service_role";

grant truncate on table "public"."documents" to "service_role";

grant update on table "public"."documents" to "service_role";

grant delete on table "public"."media" to "anon";

grant insert on table "public"."media" to "anon";

grant references on table "public"."media" to "anon";

grant select on table "public"."media" to "anon";

grant trigger on table "public"."media" to "anon";

grant truncate on table "public"."media" to "anon";

grant update on table "public"."media" to "anon";

grant delete on table "public"."media" to "authenticated";

grant insert on table "public"."media" to "authenticated";

grant references on table "public"."media" to "authenticated";

grant select on table "public"."media" to "authenticated";

grant trigger on table "public"."media" to "authenticated";

grant truncate on table "public"."media" to "authenticated";

grant update on table "public"."media" to "authenticated";

grant delete on table "public"."media" to "service_role";

grant insert on table "public"."media" to "service_role";

grant references on table "public"."media" to "service_role";

grant select on table "public"."media" to "service_role";

grant trigger on table "public"."media" to "service_role";

grant truncate on table "public"."media" to "service_role";

grant update on table "public"."media" to "service_role";

grant delete on table "public"."payload_locked_documents" to "anon";

grant insert on table "public"."payload_locked_documents" to "anon";

grant references on table "public"."payload_locked_documents" to "anon";

grant select on table "public"."payload_locked_documents" to "anon";

grant trigger on table "public"."payload_locked_documents" to "anon";

grant truncate on table "public"."payload_locked_documents" to "anon";

grant update on table "public"."payload_locked_documents" to "anon";

grant delete on table "public"."payload_locked_documents" to "authenticated";

grant insert on table "public"."payload_locked_documents" to "authenticated";

grant references on table "public"."payload_locked_documents" to "authenticated";

grant select on table "public"."payload_locked_documents" to "authenticated";

grant trigger on table "public"."payload_locked_documents" to "authenticated";

grant truncate on table "public"."payload_locked_documents" to "authenticated";

grant update on table "public"."payload_locked_documents" to "authenticated";

grant delete on table "public"."payload_locked_documents" to "service_role";

grant insert on table "public"."payload_locked_documents" to "service_role";

grant references on table "public"."payload_locked_documents" to "service_role";

grant select on table "public"."payload_locked_documents" to "service_role";

grant trigger on table "public"."payload_locked_documents" to "service_role";

grant truncate on table "public"."payload_locked_documents" to "service_role";

grant update on table "public"."payload_locked_documents" to "service_role";

grant delete on table "public"."payload_locked_documents_rels" to "anon";

grant insert on table "public"."payload_locked_documents_rels" to "anon";

grant references on table "public"."payload_locked_documents_rels" to "anon";

grant select on table "public"."payload_locked_documents_rels" to "anon";

grant trigger on table "public"."payload_locked_documents_rels" to "anon";

grant truncate on table "public"."payload_locked_documents_rels" to "anon";

grant update on table "public"."payload_locked_documents_rels" to "anon";

grant delete on table "public"."payload_locked_documents_rels" to "authenticated";

grant insert on table "public"."payload_locked_documents_rels" to "authenticated";

grant references on table "public"."payload_locked_documents_rels" to "authenticated";

grant select on table "public"."payload_locked_documents_rels" to "authenticated";

grant trigger on table "public"."payload_locked_documents_rels" to "authenticated";

grant truncate on table "public"."payload_locked_documents_rels" to "authenticated";

grant update on table "public"."payload_locked_documents_rels" to "authenticated";

grant delete on table "public"."payload_locked_documents_rels" to "service_role";

grant insert on table "public"."payload_locked_documents_rels" to "service_role";

grant references on table "public"."payload_locked_documents_rels" to "service_role";

grant select on table "public"."payload_locked_documents_rels" to "service_role";

grant trigger on table "public"."payload_locked_documents_rels" to "service_role";

grant truncate on table "public"."payload_locked_documents_rels" to "service_role";

grant update on table "public"."payload_locked_documents_rels" to "service_role";

grant delete on table "public"."payload_migrations" to "anon";

grant insert on table "public"."payload_migrations" to "anon";

grant references on table "public"."payload_migrations" to "anon";

grant select on table "public"."payload_migrations" to "anon";

grant trigger on table "public"."payload_migrations" to "anon";

grant truncate on table "public"."payload_migrations" to "anon";

grant update on table "public"."payload_migrations" to "anon";

grant delete on table "public"."payload_migrations" to "authenticated";

grant insert on table "public"."payload_migrations" to "authenticated";

grant references on table "public"."payload_migrations" to "authenticated";

grant select on table "public"."payload_migrations" to "authenticated";

grant trigger on table "public"."payload_migrations" to "authenticated";

grant truncate on table "public"."payload_migrations" to "authenticated";

grant update on table "public"."payload_migrations" to "authenticated";

grant delete on table "public"."payload_migrations" to "service_role";

grant insert on table "public"."payload_migrations" to "service_role";

grant references on table "public"."payload_migrations" to "service_role";

grant select on table "public"."payload_migrations" to "service_role";

grant trigger on table "public"."payload_migrations" to "service_role";

grant truncate on table "public"."payload_migrations" to "service_role";

grant update on table "public"."payload_migrations" to "service_role";

grant delete on table "public"."payload_preferences" to "anon";

grant insert on table "public"."payload_preferences" to "anon";

grant references on table "public"."payload_preferences" to "anon";

grant select on table "public"."payload_preferences" to "anon";

grant trigger on table "public"."payload_preferences" to "anon";

grant truncate on table "public"."payload_preferences" to "anon";

grant update on table "public"."payload_preferences" to "anon";

grant delete on table "public"."payload_preferences" to "authenticated";

grant insert on table "public"."payload_preferences" to "authenticated";

grant references on table "public"."payload_preferences" to "authenticated";

grant select on table "public"."payload_preferences" to "authenticated";

grant trigger on table "public"."payload_preferences" to "authenticated";

grant truncate on table "public"."payload_preferences" to "authenticated";

grant update on table "public"."payload_preferences" to "authenticated";

grant delete on table "public"."payload_preferences" to "service_role";

grant insert on table "public"."payload_preferences" to "service_role";

grant references on table "public"."payload_preferences" to "service_role";

grant select on table "public"."payload_preferences" to "service_role";

grant trigger on table "public"."payload_preferences" to "service_role";

grant truncate on table "public"."payload_preferences" to "service_role";

grant update on table "public"."payload_preferences" to "service_role";

grant delete on table "public"."payload_preferences_rels" to "anon";

grant insert on table "public"."payload_preferences_rels" to "anon";

grant references on table "public"."payload_preferences_rels" to "anon";

grant select on table "public"."payload_preferences_rels" to "anon";

grant trigger on table "public"."payload_preferences_rels" to "anon";

grant truncate on table "public"."payload_preferences_rels" to "anon";

grant update on table "public"."payload_preferences_rels" to "anon";

grant delete on table "public"."payload_preferences_rels" to "authenticated";

grant insert on table "public"."payload_preferences_rels" to "authenticated";

grant references on table "public"."payload_preferences_rels" to "authenticated";

grant select on table "public"."payload_preferences_rels" to "authenticated";

grant trigger on table "public"."payload_preferences_rels" to "authenticated";

grant truncate on table "public"."payload_preferences_rels" to "authenticated";

grant update on table "public"."payload_preferences_rels" to "authenticated";

grant delete on table "public"."payload_preferences_rels" to "service_role";

grant insert on table "public"."payload_preferences_rels" to "service_role";

grant references on table "public"."payload_preferences_rels" to "service_role";

grant select on table "public"."payload_preferences_rels" to "service_role";

grant trigger on table "public"."payload_preferences_rels" to "service_role";

grant truncate on table "public"."payload_preferences_rels" to "service_role";

grant update on table "public"."payload_preferences_rels" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."profiles_rels" to "anon";

grant insert on table "public"."profiles_rels" to "anon";

grant references on table "public"."profiles_rels" to "anon";

grant select on table "public"."profiles_rels" to "anon";

grant trigger on table "public"."profiles_rels" to "anon";

grant truncate on table "public"."profiles_rels" to "anon";

grant update on table "public"."profiles_rels" to "anon";

grant delete on table "public"."profiles_rels" to "authenticated";

grant insert on table "public"."profiles_rels" to "authenticated";

grant references on table "public"."profiles_rels" to "authenticated";

grant select on table "public"."profiles_rels" to "authenticated";

grant trigger on table "public"."profiles_rels" to "authenticated";

grant truncate on table "public"."profiles_rels" to "authenticated";

grant update on table "public"."profiles_rels" to "authenticated";

grant delete on table "public"."profiles_rels" to "service_role";

grant insert on table "public"."profiles_rels" to "service_role";

grant references on table "public"."profiles_rels" to "service_role";

grant select on table "public"."profiles_rels" to "service_role";

grant trigger on table "public"."profiles_rels" to "service_role";

grant truncate on table "public"."profiles_rels" to "service_role";

grant update on table "public"."profiles_rels" to "service_role";

grant delete on table "public"."recipes" to "anon";

grant insert on table "public"."recipes" to "anon";

grant references on table "public"."recipes" to "anon";

grant select on table "public"."recipes" to "anon";

grant trigger on table "public"."recipes" to "anon";

grant truncate on table "public"."recipes" to "anon";

grant update on table "public"."recipes" to "anon";

grant delete on table "public"."recipes" to "authenticated";

grant insert on table "public"."recipes" to "authenticated";

grant references on table "public"."recipes" to "authenticated";

grant select on table "public"."recipes" to "authenticated";

grant trigger on table "public"."recipes" to "authenticated";

grant truncate on table "public"."recipes" to "authenticated";

grant update on table "public"."recipes" to "authenticated";

grant delete on table "public"."recipes" to "service_role";

grant insert on table "public"."recipes" to "service_role";

grant references on table "public"."recipes" to "service_role";

grant select on table "public"."recipes" to "service_role";

grant trigger on table "public"."recipes" to "service_role";

grant truncate on table "public"."recipes" to "service_role";

grant update on table "public"."recipes" to "service_role";

grant delete on table "public"."recipes_custom_categories" to "anon";

grant insert on table "public"."recipes_custom_categories" to "anon";

grant references on table "public"."recipes_custom_categories" to "anon";

grant select on table "public"."recipes_custom_categories" to "anon";

grant trigger on table "public"."recipes_custom_categories" to "anon";

grant truncate on table "public"."recipes_custom_categories" to "anon";

grant update on table "public"."recipes_custom_categories" to "anon";

grant delete on table "public"."recipes_custom_categories" to "authenticated";

grant insert on table "public"."recipes_custom_categories" to "authenticated";

grant references on table "public"."recipes_custom_categories" to "authenticated";

grant select on table "public"."recipes_custom_categories" to "authenticated";

grant trigger on table "public"."recipes_custom_categories" to "authenticated";

grant truncate on table "public"."recipes_custom_categories" to "authenticated";

grant update on table "public"."recipes_custom_categories" to "authenticated";

grant delete on table "public"."recipes_custom_categories" to "service_role";

grant insert on table "public"."recipes_custom_categories" to "service_role";

grant references on table "public"."recipes_custom_categories" to "service_role";

grant select on table "public"."recipes_custom_categories" to "service_role";

grant trigger on table "public"."recipes_custom_categories" to "service_role";

grant truncate on table "public"."recipes_custom_categories" to "service_role";

grant update on table "public"."recipes_custom_categories" to "service_role";

grant delete on table "public"."recipes_directions" to "anon";

grant insert on table "public"."recipes_directions" to "anon";

grant references on table "public"."recipes_directions" to "anon";

grant select on table "public"."recipes_directions" to "anon";

grant trigger on table "public"."recipes_directions" to "anon";

grant truncate on table "public"."recipes_directions" to "anon";

grant update on table "public"."recipes_directions" to "anon";

grant delete on table "public"."recipes_directions" to "authenticated";

grant insert on table "public"."recipes_directions" to "authenticated";

grant references on table "public"."recipes_directions" to "authenticated";

grant select on table "public"."recipes_directions" to "authenticated";

grant trigger on table "public"."recipes_directions" to "authenticated";

grant truncate on table "public"."recipes_directions" to "authenticated";

grant update on table "public"."recipes_directions" to "authenticated";

grant delete on table "public"."recipes_directions" to "service_role";

grant insert on table "public"."recipes_directions" to "service_role";

grant references on table "public"."recipes_directions" to "service_role";

grant select on table "public"."recipes_directions" to "service_role";

grant trigger on table "public"."recipes_directions" to "service_role";

grant truncate on table "public"."recipes_directions" to "service_role";

grant update on table "public"."recipes_directions" to "service_role";

grant delete on table "public"."recipes_ingredients" to "anon";

grant insert on table "public"."recipes_ingredients" to "anon";

grant references on table "public"."recipes_ingredients" to "anon";

grant select on table "public"."recipes_ingredients" to "anon";

grant trigger on table "public"."recipes_ingredients" to "anon";

grant truncate on table "public"."recipes_ingredients" to "anon";

grant update on table "public"."recipes_ingredients" to "anon";

grant delete on table "public"."recipes_ingredients" to "authenticated";

grant insert on table "public"."recipes_ingredients" to "authenticated";

grant references on table "public"."recipes_ingredients" to "authenticated";

grant select on table "public"."recipes_ingredients" to "authenticated";

grant trigger on table "public"."recipes_ingredients" to "authenticated";

grant truncate on table "public"."recipes_ingredients" to "authenticated";

grant update on table "public"."recipes_ingredients" to "authenticated";

grant delete on table "public"."recipes_ingredients" to "service_role";

grant insert on table "public"."recipes_ingredients" to "service_role";

grant references on table "public"."recipes_ingredients" to "service_role";

grant select on table "public"."recipes_ingredients" to "service_role";

grant trigger on table "public"."recipes_ingredients" to "service_role";

grant truncate on table "public"."recipes_ingredients" to "service_role";

grant update on table "public"."recipes_ingredients" to "service_role";

grant delete on table "public"."recipes_tags" to "anon";

grant insert on table "public"."recipes_tags" to "anon";

grant references on table "public"."recipes_tags" to "anon";

grant select on table "public"."recipes_tags" to "anon";

grant trigger on table "public"."recipes_tags" to "anon";

grant truncate on table "public"."recipes_tags" to "anon";

grant update on table "public"."recipes_tags" to "anon";

grant delete on table "public"."recipes_tags" to "authenticated";

grant insert on table "public"."recipes_tags" to "authenticated";

grant references on table "public"."recipes_tags" to "authenticated";

grant select on table "public"."recipes_tags" to "authenticated";

grant trigger on table "public"."recipes_tags" to "authenticated";

grant truncate on table "public"."recipes_tags" to "authenticated";

grant update on table "public"."recipes_tags" to "authenticated";

grant delete on table "public"."recipes_tags" to "service_role";

grant insert on table "public"."recipes_tags" to "service_role";

grant references on table "public"."recipes_tags" to "service_role";

grant select on table "public"."recipes_tags" to "service_role";

grant trigger on table "public"."recipes_tags" to "service_role";

grant truncate on table "public"."recipes_tags" to "service_role";

grant update on table "public"."recipes_tags" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


