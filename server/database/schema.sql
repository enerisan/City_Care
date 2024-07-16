create TABLE category (
    id int unsigned primary key auto_increment not null,
    type VARCHAR(80) NOT NULL
);

create TABLE role (
    id int unsigned primary key auto_increment not null,
    type VARCHAR(80) NOT NULL
);

create TABLE status (
    id int unsigned primary key auto_increment not null,
    type VARCHAR(80) NOT NULL
);

create table user (
    id int unsigned primary key auto_increment not null,
    firstname VARCHAR(80) NOT NULL,
    lastname VARCHAR(80) NOT NULL,
    identity_card VARCHAR(20),
    email varchar(255) not null unique,
    password varchar(255) not null,
    geolocation BOOLEAN DEFAULT TRUE,
    role_id int unsigned not null,
    foreign key (role_id) references role (id)
);

create table incident (
    id int unsigned primary key auto_increment not null,
    title varchar(255) not null,
    latitude FLOAT,
    longitude FLOAT,
    street VARCHAR(255),
    street_number INT,
    zip_code INT,
    image TEXT,
    description TEXT,
    date DATETIME DEFAULT NOW(),
    user_id int unsigned not null,
    category_id int unsigned not null,
    status_id int unsigned not null,
    foreign key (user_id) references user (id),
    foreign key (category_id) references category (id),
    foreign key (status_id) references status (id)
);