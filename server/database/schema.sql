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
    role_id int unsigned DEFAULT 2,
    foreign key (role_id) references role (id)
);

create table incident (
    id int unsigned primary key auto_increment not null,
    title varchar(255) not null,
    address text,
    image VARCHAR(255) DEFAULT '/images/lantern-3803270_640.jpg',
    description TEXT,
    date DATETIME DEFAULT NOW(),
    user_id int unsigned not null,
    category_id int unsigned not NULL,
    status_id int unsigned not null DEFAULT 1,
    foreign key (user_id) references user (id),
    foreign key (category_id) references category (id),
    foreign key (status_id) references status (id)
);