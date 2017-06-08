$(document).ready(function () {
    var form = $("#form1").validate({
        rules: {
            txtName: {
                required: true,
            },
            txtDesc: {
                required: true,
            }
        },
        messages: {
            txtName: "Task name is required.",
            txtDesc: "Task Description is required."
        }
    });
    function clearAll() {
        $("#hdnId").val("")
        $("#txtDesc").val("");
        $("#txtName").val("");
        form.resetForm()
    }
    $("#btnCreate").on("click", function () {
        form.resetForm()
        $("#mdltitle").text("Create a Task");
        $("#taskModal").modal("show");
        clearAll();
    })
    $("#btnSave").on("click", function () {
        if (form.form()) {
            if ($("#hdnId").val() == "") {
                $("#taskModal").modal("hide");
                var tmdl = {
                    Name: $("#txtName").val(),
                    Description: $("#txtDesc").val()
                };
                $.ajax({
                    type: 'POST',
                    url: '/Task/CreateTask',
                    data: tmdl,
                    cache: false,
                    success: function (result) {
                        clearAll();
                        alert("Added Successfully");
                        location.reload();
                    },
                    error: function () {
                        alert('Err');
                    }
                });
            }
            else {
                $("#taskModal").modal("hide");
                var tmdl = {
                    ID: $("#hdnId").val(),
                    Name: $("#txtName").val(),
                    Description: $("#txtDesc").val()
                };
                $.ajax({
                    type: 'POST',
                    url: '/Task/UpdateTask',
                    data: tmdl,
                    cache: false,
                    success: function (result) {
                        clearAll();
                        alert("Updated Successfully");
                        location.reload();
                    },
                    error: function () {
                        alert('Err');
                    }
                });
            }
        }
    });
    $(".btn_Edit").on("click", function () {
        clearAll();
        $("#mdltitle").text("Edit Task");
        var id = $(this).parent().find("input").attr("id");
        $.ajax({
            type: 'GET',
            url: '/Task/GetTaskById',
            data: { id: id, },
            cache: false,
            success: function (result) {
                $("#taskModal").modal("show");
                $("#hdnId").val(result.ID);
                $("#txtName").val(result.Name);
                $("#txtDesc").val(result.Description);
            },
            error: function () {
                alert('Err');
            }
        });
    })
    $(".btn_Delete").on("click", function () {

        var r = confirm("Are you sure you want to delete this Task ?");
        if (r == true) {
            deleteTask($(this).parent().find("input").attr("id"));
        }
    });
    function deleteTask(id) {
        $.ajax({
            type: 'POST',
            url: '/Task/DeleteTask',
            data: { id: id },
            cache: false,
            success: function (result) {
                clearAll();
                alert("Deleted Successfully");
                location.reload();
            },
            error: function () {
                alert('Err');
            }
        });

    }
});