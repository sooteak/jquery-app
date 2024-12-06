window.onload = function () {
    // localStorage.clear();
    showList();
    // updateActiveState();
    sortTasks();
    // document.getElementById('searchInput').addEventListener('input', searchTasks);
    // hideCheckedList();
    // 初始化页面时调用隐藏任务的函数
    // hideCheckedTasks();
    searchTasks();
};

function create() {
    $("#addList").modal('show');
    $("#addTitle, #addContent").val('');
}


function save() {
    var addtitle = $('#addTitle').val();
    var addcontent = $('#addContent').val();
    var id = parseInt(localStorage.getItem('id')) || 0;

    var newTaskId = id;
    var endTime = getEndTime();
    var endTimeDate = new Date(endTime);

    // 获取月份、日期等信息
    var month = endTimeDate.getMonth() + 1;
    var date = endTimeDate.getDate();
    var year = endTimeDate.getFullYear();
    var hours = endTimeDate.getHours().toString().padStart(2, '0');
    var minutes = endTimeDate.getMinutes().toString().padStart(2, '0');
    var seconds = endTimeDate.getSeconds().toString().padStart(2, '0');
    var ampm = endTimeDate.getHours() >= 12 ? 'PM' : 'AM';

    if ($.trim(addtitle) === '' || $.trim(addcontent) === '') {
        // 如果标题或内容为空，显示警告框
        alert('标题和内容不能为空！');
        return; // 退出函数，不保存任务
    }


    // 构建包含月份等信息的对象
    var endTimeInfo = {
        month: month,
        date: date,
        year: year,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        ampm: ampm,
    };

    // 存储包含月份等信息的对象到endTime数组中
    var endTimeArray = [endTimeInfo];



    var list01 = {
        title: addtitle,
        content: addcontent,
        id: newTaskId,
        complete: false,
        endTime: endTimeArray,

    }
    // Get the existing data
    var existing = localStorage.getItem('list01');
    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    existing = existing ? JSON.parse(existing) : [];
    // Check if existing is an array, if not make it an array
    if (!Array.isArray(existing)) {
        existing = [existing];
    }
    // Add new data to localStorage Array
    existing.push(list01);
    // Save back to localStorage
    localStorage.setItem('list01', JSON.stringify(existing));
    localStorage.setItem('id', ++id);
    $('#addList').modal('hide');
    showList();
    // saveActive();
    // getEndTime();
    // hideCheckedTasks();
    searchTasks();
    showOrHide();

}



function showList() {

    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var showList = JSON.parse(localStorage.getItem('list01'));
    if (showList === null) {
        console.error("showList is null");
        return;
    }

    $('#list').html(''); // 清空 #list 元素的内容
    for (var i = showList.length - 1; i >= 0; i--) {
        const title = showList[i]?.title ?? '';
        var endTimeInfo = showList[i].endTime[0]; // 获取endTime对象

        // 获取endTime对象的月份属性
        var month = endTimeInfo.month;
        var date = endTimeInfo.date;
        var year = endTimeInfo.year;
        var hour = endTimeInfo.hours;
        var minute = endTimeInfo.minutes;
        var ampm = endTimeInfo.ampm;

        // 获取英文月份名称
        var monthName = monthNames[month - 1];

        var checkboxChecked = showList[i].complete ? 'checked' : '';

        // 创建checkBox的HTML代码
        // let checkBox = `<div class="t-checkbox" style="flex-grow: 0.5;">
        //                     <input type="checkbox" class="checkbox" ${checkboxChecked} onclick="isActive(${showList[i].id})">
        //                 </div>`;

        // let Ltitle = `<div class="t-title" style="flex-grow: 10;">
        //                 <p class="title">${title}</p>
        //             </div>`

        // let logo = `<div class="t-logo" style="flex-grow: 0.5;">
        //                 <div class="logo">
        //                     <img src="logo/edit.png" class="edit" onclick="edit(${showList[i].id})" alt="edit">
        //                     <img src="logo/delete.png" class="delete" onclick="dlt(${showList[i].id})" alt="delete">
        //                     <img src="logo/down.png" class="hide" id="toggle-icon-${i}" onclick="toggleContent(${i})" alt="up">
        //                 </div>
        //             </div>`

        // // 创建listItem的HTML代码，将checkBox添加到listItem中
        // let listItem = `<div id='table-${showList[i].id}' class="table">
        //                     <div class="titlePart">
        //                         ${checkBox} <!-- 添加checkBox到listItem中 -->
        //                         ${Ltitle}
        //                         ${logo}
        //                     </div>
        //                 </div>`;

        

        // 将listItem添加到#list元素中
        // $('#list').append(listItem);
        let listItem = `<div class="list">
        <div id='table-${showList[i].id}' class="table">
            <div class="titlePart">
                    <div class="t-checkbox" style="flex-grow: 0.5;">
                        <input type="checkbox" class="checkbox" onclick="isActive(${showList[i].id})"${showList[i].complete ? 'checked' : ''}>
                    </div>
                    <div class="t-title" style="flex-grow: 10;">
                        <p class="title">${title}</p>
                    </div>
                    <div class="t-logo" style="flex-grow: 0.5;">
                        <div class="logo">
                            <img src="logo/edit.png" class="edit" onclick="edit(${showList[i].id})" alt="edit">
                            <img src="logo/delete.png" class="delete" onclick="dlt(${showList[i].id})" alt="delete">
                            <img src="logo/down.png" class="hide" id="toggle-icon-${i}" onclick="toggleContent(${i})" alt="up">
                        </div>
                    </div>
            </div> 
            
            <div class="task-content" id="task-content-${i}" style="display: none;">
            
                <div colspan="2">
                    <div class="time">
                        <p>Last Modified ${monthName} ${date} ${year} at ${hour}:${minute}${ampm}</p>
                    </div>
                    <div class="content">${showList[i]?.content ?? ''}</div>
            </div>
        </div>
    </div>`
        //                     <div id='table-${showList[i].id}' class="table">
        //                         <div class="titlePart">
        //                             <div class="t-checkbox" style="flex-grow: 0.5;">
        //                              <input type="checkbox" class="checkbox" onclick="isActive(${showList[i].id})"${showList[i].complete ? 'checked' : ''}>
        //                          </div>
        //                             <div class="t-title" style="flex-grow: 10;">
        //                                 <p class="title">${title}</p>
        //                             </div>
        //                             <div class="t-logo" style="flex-grow: 0.5;">
        //                                 <div class="logo">
        //                                     <img src="logo/edit.png" class="edit" onclick="edit(${showList[i].id})" alt="edit">
        //                                     <img src="logo/delete.png" class="delete" onclick="dlt(${showList[i].id})" alt="delete">
        //                                     <img src="logo/down.png" class="hide" id="toggle-icon-${i}" onclick="toggleContent(${i})" alt="up">
        //                                 </div>
        //                             </div>
        //                         </div> 
        //                         <div class="task-content" id="task-content-${i}" style="display: none;">
        //                             <div colspan="2">
        //                                 <div class="time">
        //                                     <p>Last Modified ${monthName} ${date} ${year} at ${hour}:${minute}${ampm}</p>
        //                                 </div>
        //                                 <div class="content">${showList[i]?.content ?? ''}</div>
        //                             </div>
        //                         </div>
        //                     </div>


        $('#list').append(listItem);
        // $('.form-check-input').append(checkBox);
    }


    console.log("showList is: ", showList);
};

//show the time when create or edit
function getEndTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 注意月份是从0开始计数的，所以要加1
    const day = now.getDate().toString().padStart(2, '0');
    let hours = now.getHours() % 12; // 取12小时制
    hours = (hours === 0 ? 12 : hours).toString().padStart(2, '0'); // 如果为0，则为12小时制的12
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM'; // 判断是上午还是下午

    const timeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
    return timeString;


}

function isActive(id) {
    var list = JSON.parse(localStorage.getItem('list01'));
    const checkboxes = $('.checkbox');

    for (var i = 0; i < checkboxes.length; i++) {
        if (list[i].id === id) {
            if (list[i].complete === false) {
                list[i].complete = true;
            } else {
                list[i].complete = false;
            }
        }
    }

    localStorage.setItem('list01', JSON.stringify(list));
    console.log(list);
}


var currentTaskIndex = null; // 用于存储当前任务的索引

function edit(id) {

    $('#editList').modal('show');
    currentTaskIndex = id;
    // 获取localStorage中的数据
    var list = JSON.parse(localStorage.getItem('list01'));

    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            $('#editTitle').val(list[i].title);
            $('#editContent').val(list[i].content);
            $('#editCheckBox').prop('checked', list[i].complete);
            break; // 找到匹配的任务后，跳出循环
        }
    }

}


function update() {
    var id = currentTaskIndex;
    if (currentTaskIndex !== null) {
        var editTitle = $('#editTitle').val();
        var editContent = $('#editContent').val();
        var editCheckBox = $('#editCheckBox').prop('checked');
        var endTime = getEndTime();
        var endTimeDate = new Date(endTime);

        // 获取月份、日期等信息
        var month = endTimeDate.getMonth() + 1;
        var date = endTimeDate.getDate();
        var year = endTimeDate.getFullYear();
        var hours = endTimeDate.getHours().toString().padStart(2, '0');
        var minutes = endTimeDate.getMinutes().toString().padStart(2, '0');
        var seconds = endTimeDate.getSeconds().toString().padStart(2, '0');
        var ampm = endTimeDate.getHours() >= 12 ? 'PM' : 'AM';

        // 构建包含月份等信息的对象
        var endTimeInfo = {
            month: month,
            date: date,
            year: year,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            ampm: ampm,
        };

        // 存储包含月份等信息的对象到 endTime 数组中
        var endTimeArray = [endTimeInfo];
        var list = JSON.parse(localStorage.getItem('list01'));

        // 删除当前任务的原始数据
        list = list.filter(function (task) {
            return task.id !== id;
        });

        // 添加新编辑的任务数据
        list.push({
            title: editTitle,
            content: editContent,
            id: currentTaskIndex,
            complete: editCheckBox,
            endTime: endTimeArray, // 使用包含月份等信息的对象的数组格式
        });

        localStorage.setItem('list01', JSON.stringify(list));

        // 隐藏编辑表单
        $('#editList').modal('hide');

        // 重新显示任务列表
        showList();
    }
    // hideCheckedTasks();
    searchTasks();
    showOrHide();
}


var currentDeleTaskIndex = null; // 用于存储当前任务的索引

function dlt(id) {
    var list = JSON.parse(localStorage.getItem('list01'));
    // 获取任务在数组中的索引
    currentDeleTaskIndex = $.map(list, function (task, index) {
        if (task.id === id) {
            return index;
        }
    });
    console.log(currentDeleTaskIndex);
    $('#deleteList').modal('show');
    
}


function drop() {
    if (currentDeleTaskIndex !== null) {
        var list = JSON.parse(localStorage.getItem('list01'));
        // 删除指定索引位置的任务
        list.splice(currentDeleTaskIndex, 1);
        // 保存更新后的数据到 localStorage
        localStorage.setItem('list01', JSON.stringify(list));

        // 隐藏编辑表单
        $('#deleteList').modal('hide');
        // 重新显示任务列表
        showList();
    }
    // hideCheckedTasks();
    searchTasks();
    showOrHide();
}


function toggleContent(index) {
    var contentRow = $('#task-content-' + index);
    var toggleIcon = $('#toggle-icon-' + index);

    if (contentRow && toggleIcon) {
        if (contentRow.css('display') === 'none' || contentRow.css('display') === 'none') {
            contentRow.show(); // 或者其他你想要的显示方式
            toggleIcon.attr('src', 'logo/up.png'); // 切换为向上的图标
        } else {
            contentRow.hide();
            toggleIcon.attr('src', 'logo/down.png'); // 切换为向下的图标
        }
    }
}


function hideCheckedTasks() {
    $('.checkbox').each(function () {
        if ($(this).prop('checked')) {
            $(this).closest('.table').css('display', 'none'); // 隐藏已勾选的任务
        }
    });
}


// 显示所有任务
function showAllTasks() {
    var searchKeyword = $('#searchInput').val().toLowerCase();
    $('.table').each(function () {
        var taskId = $(this).attr('id').split('-')[1];
        var task = JSON.parse(localStorage.getItem('list01')).find(function (task) {
            return task.id === parseInt(taskId);
        });

        var taskTitle = task.title.toLowerCase();
        var taskContent = task.content.toLowerCase();

        if (taskTitle.includes(searchKeyword) || taskContent.includes(searchKeyword)) {
            $(this).css('display', 'block'); // 显示匹配搜索关键字的任务
        } else {
            $(this).css('display', 'none'); // 隐藏不匹配搜索关键字的任务
        }
    });
}




// 切换显示/隐藏已勾选任务的状态
function toggleCheckedTasks() {
    var showListElement = $('.showList');
    showListElement.toggleClass('hide-checked');

    if (showListElement.hasClass('hide-checked')) {
        showListElement.text('Show All List');
        hideCheckedTasks();
        searchTasks();
    } else {
        showListElement.text('Hide Checked List');
        showAllTasks();
        searchTasks();
    }
}

function sortTasks() {
    var sortBy = $('#sorts').val();
    var tasks = JSON.parse(localStorage.getItem('list01'));

    if (sortBy === 'date') {
        tasks.sort(function (a, b) {
            // 将日期字符串转换为时间戳进行比较
            return new Date(a.endTime[0].year, a.endTime[0].month - 1, a.endTime[0].date, a.endTime[0].hours, a.endTime[0].minutes, a.endTime[0].seconds).getTime() -
                new Date(b.endTime[0].year, b.endTime[0].month - 1, b.endTime[0].date, b.endTime[0].hours, b.endTime[0].minutes, b.endTime[0].seconds).getTime();
        });
    } else if (sortBy === 'title') {
        tasks.sort(function (a, b) {
            return b.title.localeCompare(a.title);
        });
    } else if (sortBy === 'default') {
        // 默认按照任务的ID排列
        tasks.sort(function (a, b) {
            return a.id - b.id;
        });
    }

    // 更新排序后的任务列表到 localStorage
    localStorage.setItem('list01', JSON.stringify(tasks));

    // 显示排序后的任务列表
    showList();

    // 初始化页面时调用隐藏任务的函数
    searchTasks();
    // hideCheckedTasks();
    showOrHide();
}


function searchTasks() {
    var searchKeyword = $('#searchInput').val().toLowerCase();
    var tasks = JSON.parse(localStorage.getItem('list01'));
    tasks.forEach(function (task) {
        var taskTitle = task.title.toLowerCase();
        var taskContent = task.content.toLowerCase();
        var taskId = task.id;
        var taskElement = $('#table-' + taskId);

        if (taskTitle.includes(searchKeyword) || taskContent.includes(searchKeyword)) {
            // 如果任务的标题或内容包含搜索关键字，显示任务
            if (taskElement) {
                taskElement.css('display', 'block');
            }
        } else {
            // 如果任务的标题和内容都不包含搜索关键字，隐藏任务
            if (taskElement) {
                taskElement.css('display', 'none');
            }
        }
    });

    // hideCheckedTasks();
    showOrHide();
}


function showOrHide() {
    var showListElement = $('.showList');
    var textContent = showListElement.text().trim();
    var isShowAllList = textContent.toLowerCase() === 'show all list';

    if (isShowAllList) {
        hideCheckedTasks();
    } else {
        showAllTasks();
    }
}



