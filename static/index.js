$(document).ready(() => showArticles());

const openClose = function () {
  const status = $("#url-box").css("display");
  if (status == "block") {
    $("#openClose-btn").text("URL박스 열기");
    $("#url-box").hide();
  } else {
    $("#openClose-btn").text("URL박스 닫기");
    $("#url-box").show();
  }
};

const posting = function () {
  let articleURL = $("#posting-url").val();
  let comment = $("#posting-comment").val();
  $.ajax({
    type: "POST",
    url: "/post",
    data: { give_url: articleURL, give_comment: comment },
    success: function (response) {
      if (response["result"] == "success") {
        alert("포스팅 성공");
        window.location.reload();
      }
    },
  });
};

const showArticles = function () {
  $.ajax({
    type: "GET",
    url: "/read",
    data: {},
    success: function (response) {
      const articles = response["info"];
      for (let i = 0; i < articles.length; i++) {
        makeCard(
          articles[i]["title"],
          articles[i]["image"],
          articles[i]["url"],
          articles[i]["desc"],
          articles[i]["comment"]
        );
      }
    },
  });
};

const makeCard = function (title, img, url, desc, comment) {
  const templateHtml = `<div class="col mb-4">
                            <div class="card h-100">
                                <img src="${img}" class="card-img-top" alt="image-cap" />
                                <div class="card-body">
                                    <h5 class="card-title"><a href="${url}">${title}</a></h5>
                                    <p class="card-text">
                                    ${desc}
                                    </p>
                                </div>
                                <div class="card-footer">
                                    <p>${comment}</p>
                                </div>
                            </div>
                        </div>`;
  $("#card-box").append(templateHtml);
};
