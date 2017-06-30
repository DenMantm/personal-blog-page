export interface IUser{
    id:number;
    userName:string;
    firstName:string;
    lastName:string;
    appSettings:{colourScheme:string,
                 navbarColourScheme:Object,
                 stayAlive:boolean};
    babySettings:{babyName:string,
                  babyBirthDate:Date};
}