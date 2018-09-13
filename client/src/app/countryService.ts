import { Injectable }  from '@angular/core';
import { country }  from './country';
import { city }  from './city';

@Injectable()
export class countryService {
    //array of countries
    getCountries() {
        return [
            new country(1, 'Israel'),
            new country(2, 'Russia')
        ];
    }

    //array of citys according to countrys
    getCities() {
        return [
            new city(1, 1, 'Acre'),
            new city(2, 1, 'Afula'),
            new city(3, 1, 'Ashdod'),
            new city(4, 1, 'Ashkelon'),
            new city(5, 1, 'Afula'),
            new city(6, 1, 'Beersheba'),
            new city(7, 1, 'Beit Shean'),
            new city(8, 1, 'Eilat'),
            new city(9, 1, 'Hadera'),
            new city(10, 1, 'Haifa'),
            new city(11, 1, 'Jerusalem'),
            new city(12, 1, 'Migdal HaEmek'),
            new city(13, 1, 'Nazareth'),
            new city(14, 1, 'Nazareth Illit'),
            new city(15, 1, 'Netanya'),
            new city(16, 1, 'Rishon LeZion'),
            new city(17, 1, 'Tel Aviv'),
            new city(18, 1, 'Other'),

            new city(1, 2, 'Moscow'),
            new city(2, 2, 'Saint-Petersburg'),
            new city(2, 3, 'Other'),
            ];
        }
}