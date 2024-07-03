export const formatFullTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleTimeString('en-US', options);
};

export const formatNameObj = (nameObject) => {
    if (nameObject === "") {
        return null
    }
    const { firstName, middleName, lastName } = nameObject;
    let fullName = `${firstName} ${lastName}`;
    if (middleName) {
        fullName = `${firstName} ${middleName} ${lastName}`;
    }
    return fullName;
};

export const formatDate = (date) => {
    if (!date) {
        return ''; // or handle it in a way that makes sense for your application
    }

    const isoDate = new Date(date);

    if (isNaN(isoDate.getTime())) {
        return ''; // or handle it in a way that makes sense for your application
    }

    // Get year, month, and day
    const year = isoDate.getFullYear();
    const month = String(isoDate.getMonth() + 1).padStart(2, '0');
    const day = String(isoDate.getDate()).padStart(2, '0');

    // Construct the formatted date
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
};

export const calculateFullDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end - start;
    const hours = Math.floor(durationInMilliseconds / 3600000);
    const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000);

    if (minutes === 0) {
        return `${hours} hrs`;
    } else {
        return `${hours} hrs ${minutes} mins`;
    }
};

export const handleDownload = (pdfFile, fileName) => {
    const arrayBufferView = new Uint8Array(pdfFile.data);
    const blob = new Blob([arrayBufferView], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
};