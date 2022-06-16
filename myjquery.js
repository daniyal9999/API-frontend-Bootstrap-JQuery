$(function () {
    loadrecipes();
    $("#recipes").on("click", ".btn-outline-danger", handleDelete);
    $("#recipes").on("click", ".btn-outline-warning", handleUpdate);
    $("#addbtn").click(addRecipes);
    $("#updateSave").click(function () {
        var id = $("#updateId").val();  
        var name = $("#updateTitle").val();
        var price = $("#updateBody").val();
        console.log(id + "-" + title + "-" + body)

        $.ajax({
            url: "https://restfulapi-by-daniyal.herokuapp.com/api/storage/" + id,
            data: { name, price },  
            method: "PUT",
            success: function (response) {
                console.log("^<-+->^" + response);
                loadrecipes();
                $("#updateModal").modal("hide");

            }
        })
    })
});
function handleUpdate() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("id");
    $.get("https://restfulapi-by-daniyal.herokuapp.com/api/storage/" + id, function (response) {
        $("#updateId").val(response._id),
            $("#updateTitle").val(response.name),
            $("#updateBody").val(response.price)
        $("#updateModal").modal("show");

    })

}
function addRecipes() {
    var name = $("#title").val();
    var price = $("#body").val();
    console.log(name,price)
    $.ajax({
        url: "https://restfulapi-by-daniyal.herokuapp.com/api/storage/",
        method: "POST",
        data: { name, price },
        success: function (response) {
          console.log(response)
          loadrecipes();
        }
    });
}

function handleDelete() {
    var btn = $(this);
    var parentDiv = btn.closest(".recipe");
    let id = parentDiv.attr("id");
    console.log(id)
    $.ajax({
        url: "https://restfulapi-by-daniyal.herokuapp.com/api/storage/" + id,
        method: "DELETE",
        success: function () {
            loadrecipes();
        }
    })
}
function loadrecipes() {
    $.ajax({
        url: "https://restfulapi-by-daniyal.herokuapp.com/api/storage/",
        method: "GET",
        error: function (response) {
            var recipes = $("#recipes");
            recipes.html("An error occured");
        },
        success: function (response) {
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for (let i = 0; i < response.length; i++) {
                var rec = response[i];
                recipes.append(`<div class="recipe" id=${rec._id}><h3>${rec.name}</h3><button class="btn btn-outline-warning btn-sm float-right">Edit</button><button class="btn btn-outline-danger btn-sm float-right">Delete</button><p>${rec.price}</p></div>`)
            }
        }
    })
}