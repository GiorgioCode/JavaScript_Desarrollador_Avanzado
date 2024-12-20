const app = document.getElementById("app");
const plantilla = Handlebars.compile(`
{{#each cervezas}}
<div class="card" style="width: 18rem;">
{{#if this.Image}}
<img src="{{this.Image}}" class="card-img-top" alt="...">
{{else}}
<img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" class="card-img-top" alt="...">
{{/if}}
  <div class="card-body">
    <h5 class="card-title">{{this.Name}}</h5>
    {{#unless ConStock}}
    <p class="card-text">Sin Stock</p>
    {{/unless}}
    <a href="#" class="btn btn-primary">Comprar</a>
  </div>
</div>
{{/each}}`);

app.innerHTML = plantilla({
    cervezas: [
        {
            Name: "Estrella",
            Image: "https://th.bing.com/th/id/OIP.DwONb5zRSDZGEQsOqz1f8wHaHa?pid=ImgDet&rs=1",
            Brewery: "Damm",
            Style: "Euro Lager",
            Abv: "5.4",
            Ibu: "25",
            ConStock: false,
        },
        {
            Name: "Voll Damm",
            Image: "",
            Brewery: "Damm",
            Style: "Bock",
            Abv: "7.2",
            Ibu: "40",
            ConStock: false,
        },
        {
            Name: "Devil's",
            Image: "",
            Brewery: "Marina",
            Style: "Indian Pale Ale",
            Abv: "9.0",
            Ibu: "150",
            ConStock: true,
        },
        {
            Name: "Guinness Draught",
            Image: "https://th.bing.com/th/id/OIP.upA00YmQzY2kamPH46sNxwHaHa?pid=ImgDet&rs=1",
            Brewery: "Guinness",
            Style: "Irish Stout",
            Abv: "4.5",
            Ibu: "40",
            ConStock: true,
        },
    ],
});
