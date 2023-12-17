import Swal from 'sweetalert2';

export const openSaveSettingModal = async () => {
  const prevThumbnailPath = window.electron.store.get('THUMBNAIL_PATH');
  const prevSavePath = window.electron.store.get('SAVE_PATH');

  const { value: formValues } = await Swal.fire({
    animation: false,
    title: '저장 설정',
    html: `
<div style="display:flex; flex-direction:column; gap:12px">
<div>
<label>썸네일 저장 위치</label>
<input id="swal-input1" class="swal2-input" value="${prevThumbnailPath}">
</div>
<div>
<label>파일 저장 위치</label>
<input id="swal-input2" class="swal2-input" value="${prevSavePath}">
</div>
</div>
`,
    focusConfirm: false,
    preConfirm: () => {
      const input1 = document.getElementById('swal-input1') as HTMLInputElement;
      const input2 = document.getElementById('swal-input2') as HTMLInputElement;
      if (!input1 || !input2) {
        throw new Error('Input not found');
      }
      return [input1.value, input2.value];
    },
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  });
  if (formValues) {
    const [nextThumbnailPath, nextSavePath] = formValues;
    window.electron.store.set('THUMBNAIL_PATH', nextThumbnailPath);
    window.electron.store.set('SAVE_PATH', nextSavePath);
  }
};
