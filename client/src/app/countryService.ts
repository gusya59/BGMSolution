import { Injectable }  from '@angular/core';
import { country }  from './country';
import { city }  from './city';

@Injectable()
export class countryService {
    getCountries() {
        return [
            new country(1, 'Israel'),
            new country(2, 'Russia')
        ];
    }

    getCities() {
        return [
            new city(1, 1, 'Haifa'),
            new city(2, 1, 'Tel-Aviv'),
            new city(3, 1, 'Jerusalem'),
            new city(4, 1, 'Nazareth-illit'),
            new city(5, 1, 'Afula'),
            new city(6, 1, 'Be er - sheva'),
            new city(1, 2, 'Moscow'),
            new city(2, 2, 'Saint-Petersburg'),
            ];
        }
}