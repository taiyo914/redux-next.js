"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper as SwiperType } from "swiper";
import Link from "next/link";
import useUserStore from "@/store/userStore";
import LoadingDots from "../LoadingDots";
import CustomSlider from "./CustomSlider";
import { createClient } from "@/utils/supabase/client";

const Review = () => {
  const supabase = createClient();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexValues, setindexValues] = useState<number[]>([]);
  const {
    words,
    setWords,
    fetchWords,
    userId,
    fetchUserId,
    wordsSettings,
    fetchUserWordsSettings,
  } = useUserStore();
  const [indexValue, setIndexValue] = useState(1);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!words) {
        // wordsがnullならデータを取得
        const userIdError = await fetchUserId();
        if (userIdError) {
          console.error("ユーザーIDの取得中にエラーが発生しました:", userIdError);
          return;
        }

        const wordsSettingsError = await fetchUserWordsSettings();
        if (wordsSettingsError) {
          console.error("設定の取得中にエラーが発生しました:", wordsSettingsError);
          return;
        }

        const wordsError = await fetchWords();
        if (wordsError) {
          console.error("単語の取得中にエラーが発生しました:", wordsError);
        }
      }
    };

    fetchAllData();
  }, [words, fetchUserId, fetchUserWordsSettings, fetchWords]);

  if (!words) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingDots />
      </div>
    );
  }

  const handleSliderChange = (newIndexValue: number, wordId: string) => {

    //words状態を更新
    const updatedWords = words?.map((word) =>
      word.id === wordId ? { ...word, index: newIndexValue } : word
    );

    setWords(updatedWords);

    // Supabaseに変更を反映
    const updateWordIndex = async () => {
      try {
        const { error } = await supabase
          .from("words")
          .update({ index: newIndexValue })
          .eq("id", wordId);
        if (error) {
          console.error("Supabase更新エラー:", error.message);
        } else {
          console.log("indexの変更がsupabaseに保存されました!!");
        }
      } catch (err) {
        console.error("データベース更新中にエラーが発生しました:", err);
      }
    };

    updateWordIndex();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const isNotFirstOrLastSlide = activeIndex > 0 && activeIndex < words.length * 5 + 1;

  return (
    <div className="h-screen p-4 flex flex-col items-center ">
      <div className="w-full">
        <div className="flex justify-between items-center mb-2 px-1">
          <Link
            href="/" //今は簡易的にリンクを付けているが、データベースに状態を更新してから戻る
            className="px-4 py-2 border-2 font-semibold rounded-md shadow-sm hover:bg-gray-100 transition duration-300"
          >
            完 了
          </Link>
          <Link
            href="#" //ここもcardIndexによって動的に変える必要がある
            className="p-2 font-semibold bg-gray-300 rounded-md border-2 border-gray-300 shadow hover:bg-gray-400 hover:border-gray-400 transition duration-300"
          >
            カードを編集
          </Link>
        </div>
      </div>
      <Swiper
        navigation
        pagination={{ type: "progressbar" }}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true }} //設定で縦スクロールも選べるようにするとよい
        onSlideChange={handleSlideChange}
        modules={[Navigation, Pagination, Keyboard, Mousewheel]}
        spaceBetween={30}
        className="w-full h-full border p-2 rounded-lg"
      >
        <SwiperSlide>
          <div className="h-full flex flex-col items-center justify-center text-3xl text-gray-500 opacity-20">
            <div className="text-3xl font-bold mb-4">Let's get started ! ➞</div>
          </div>
        </SwiperSlide>
        {words.map((word) => (
          <div key={word.id}>
            {word.word && (
              <SwiperSlide key={`${word.id}-word`}>
                <div className="flex flex-col h-full justify-between">
                  <div className="text-gray-400 pt-3 px-3 xs:text-2xl">語句</div>
                  <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                    <div className="font-bold">{word.word}</div>
                  </div>
                  <CustomSlider
                    sliderValue={word.index}
                    onChange={(value) => handleSliderChange(value, word.id)}
                  />
                </div>
              </SwiperSlide>
            )}
            {word.meaning && (
              <SwiperSlide key={`${word.id}-meaning`}>
                <div className="flex flex-col h-full justify-between">
                  <div className="text-gray-400 pt-3 px-3 xs:text-2xl">意味</div>
                  <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                    <div className="font-bold">{word.meaning}</div>
                  </div>
                  <CustomSlider
                    sliderValue={word.index}
                    onChange={(value) => handleSliderChange(value, word.id)} 
                  />
                </div>
              </SwiperSlide>
            )}
            {word.example && (
              <SwiperSlide key={`${word.id}-example`}>
              <div className="flex flex-col h-full justify-between">
                <div className="text-gray-400 pt-3 px-3 xs:text-2xl">例文</div>
                <div className="f-full flex items-center justify-center text-3xl pl-16 pr-16">
                  <div className="font-bold">{word.example}</div>
                </div>
                <CustomSlider
                  sliderValue={word.index}
                  onChange={(value) => handleSliderChange(value, word.id)} 
                />
              </div>
            </SwiperSlide>
            )}
            {word.example_translation && (
              <SwiperSlide key={`${word.id}-example_translation`}>
              <div className="flex flex-col h-full justify-between">
                <div className="text-gray-400 pt-3 px-3 xs:text-2xl">例文訳</div>
                <div className="f-full flex items-center justify-center text-3xl pl-16 pr-16">
                  <div className="font-bold">{word.example_translation}</div>
                </div>
                <CustomSlider
                  sliderValue={word.index}
                  onChange={(value) => handleSliderChange(value, word.id)} 
                />
              </div>
            </SwiperSlide>
            )}
            {word.memo && (
              <SwiperSlide key={`${word.id}-memo`}>
                <div className="flex flex-col h-full justify-between">
                <div className="text-gray-400 pt-3 px-3 xs:text-2xl">メモ</div>
                <div className="f-full flex items-center justify-center text-3xl pl-16 pr-20">
                  <div className="font-bold">{word.memo}</div>
                </div>
                <CustomSlider
                  sliderValue={word.index}
                  onChange={(value) => handleSliderChange(value, word.id)}
                />
              </div>
              </SwiperSlide>
            )}
          </div>
        ))}

        <SwiperSlide>
          <div className="h-full flex flex-col items-center justify-center   bg-gradient-to-t from-yellow-300 to-orange-400 text-gray-100 p-8 rounded-lg shadow-xl">
            <div className="flex space-x-2 text-3xl">
              <div className="w-7 h-1"></div>
              <div className="font-bold mb-3">Great job !</div>
              <div className="animate-bounce"> 🎉</div>
            </div>
            <div className="text-lg">すべてのカードを復習しました！</div>
            <div>
              →{" "}
              <Link href="/" className="underline underline-offset-2">
                Home
              </Link>{" "}
              へ戻る
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

    </div>
  );
};

export default Review;
